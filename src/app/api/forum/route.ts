import prisma from "@/db";
import { Forum } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { uploadCloudinary } from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";
import generateRandomString from "@/helper/generateRandomString";
interface forumQuery {
  include: {};
  where?: {
    userId: {};
  };
  orderBy?: {} | [];
}
export async function GET(req: NextRequest): Promise<any> {
  try {
    const url = new URL(req.url);
    const session = await getServerSession(authOptions);
    const cursor = url.searchParams.get("cursor");
    const sort = url.searchParams.get("sort");
    // const forums = await prisma.forum.findMany({
    //   ...(cursor && {
    //     skip: 1,
    //     cursor: {
    //       id: cursor,
    //     },
    //   }),
    //   take: 1,
    //   include: {
    //     _count: {
    //       select: {
    //         forumLikes: true,
    //         comments: true,
    //       },
    //     },
    //   },

    //   //TODO: ADD A ONE MORE SORT HERE FOR FOLLOWING USER SORT
    //   // if the forum have the same numnber of like, added a second criteria for sorting which is the createdAt here
    //   //@ts-ignore  /// temporary ignoring the error here
    //   orderBy: [
    //     ...(sort === "popular"
    //       ? [
    //           {
    //             forumLikes: {
    //               _count: "desc",
    //             },
    //           },
    //           {
    //             createdAt: "desc", // Secondary sort criterion
    //           },
    //         ]
    //       : [
    //           {
    //             createdAt: sort === "newest" ? "desc" : "asc",
    //           },
    //         ]),
    //   ],
    // });

    const forumQuery: forumQuery = {
      include: {
        _count: {
          select: {
            forumLikes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    };

    if (sort === "oldest") {
      forumQuery.orderBy = {
        createdAt: "asc",
      };
    }
    if (sort === "newest") {
      forumQuery.orderBy = {
        createdAt: "desc",
      };
    }
    if (sort === "popular") {
      forumQuery.orderBy = [
        {
          forumLikes: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc", // Secondary sort criterion
        },
      ];
    }

    if (sort === "following") {
      const data = await prisma.user.findMany({
        where: {
          id: session?.user.id as string,
        },
        include: {
          following: {
            select: {
              followingId: true,
            },
          },
        },
      });

      const followingIds = data
        .flatMap((user) => user.following)
        .map((res) => res.followingId) ?? []
      forumQuery.where = {
        ...forumQuery.where,
        userId: {
          in: followingIds.length > 0 ? followingIds : [''], 
        },
      };
    }

    const forums = await prisma.forum.findMany({
      ...forumQuery,
      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),
      take:1,
    });

    if (forums.length === 0) {
      return NextResponse.json(
        {
          data: [],
          metaData: {
            lastCursor: null,
            hasNextPage: false,
          },
        },
        { status: 200 }
      );
    }
    const lastForum: Forum = forums[forums.length - 1];
    const newCursor = lastForum.id;
    const nextForum = await prisma.forum.findMany({
      cursor: {
        id: newCursor,
      },
      take: 1,
      skip: 1,
    });
    const data = {
      data: forums,
      metaData: {
        lastCursor: newCursor !== undefined ? newCursor : null,
        hasNextPage: nextForum.length > 0,
      },
    };
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching forums:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  let imageUpload: any;
  const body = await req.formData();
  const image = body.get("image") as unknown as File;
  if (image) {
    imageUpload = await uploadCloudinary(image, "algorithmic-oddysey");
  }
  const captions = JSON.parse(body.get("caption") as string);
  const title = JSON.parse(body.get("title") as string);
  const content = JSON.parse(body.get("content") as string);
  /// FOR TITLE ID RANDOM STRING
  const titleId = generateRandomString();
  try {
    await prisma.forum.create({
      data: {
        caption: captions ?? null,
        title: title,
        titleId,
        forumImage: imageUpload?.secure_url ?? null,
        content,
        user: {
          connect: {
            id: session?.user.id,
          },
        },
      },
      select: {
        caption: true,
        forumImage: true,
        title: true,
      },
    });
    revalidatePath("/forum", "page");
    return NextResponse.json({ message: "SUCCESFULLY ADDED" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
