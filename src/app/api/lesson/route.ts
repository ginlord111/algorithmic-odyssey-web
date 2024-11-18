import prisma from "@/db";
import { LessonProgressProps } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["https://algo-thesis.onrender.com"]; // Add more origins if needed

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");

  // Only allow specific origins
  if (origin && allowedOrigins.includes(origin)) {
    return NextResponse.json(null, {
      headers: {
        "Access-Control-Allow-Origin": origin, // Allow the specific origin
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  // If origin is not allowed, send a 403 response without setting CORS headers
  return NextResponse.json(null, {
    status: 403,
  });
}

// Handle POST request
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");

  // CORS headers
  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true", // Allow credentials
  };

  // Only add Access-Control-Allow-Origin if the origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    corsHeaders["Access-Control-Allow-Origin"] = origin;
  } else {
    // Optionally, you could log or handle disallowed origins here
    corsHeaders["Access-Control-Allow-Origin"] = ""; // Or you can omit this header entirely
  }

  try {
    const { student_id, key, value } = await req.json();

    const data = await prisma.user.findUnique({
      where: { id: student_id },
      select: { lessonProgress: true },
    });

    if (!data) {
      return new NextResponse(
        JSON.stringify({ message: "Student not found" }),
        { status: 404, headers: corsHeaders }
      );
    }

    const lessonProgress = data?.lessonProgress as unknown as LessonProgressProps;
    lessonProgress.progress[key] = value;

    await prisma.user.update({
      where: { id: student_id },
      data: { lessonProgress: lessonProgress as any },
    });

    return new NextResponse(JSON.stringify({ message: "Success" }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
