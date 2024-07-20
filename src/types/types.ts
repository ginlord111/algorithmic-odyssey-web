import { Forum, ForumLike } from "@prisma/client";

export interface AccountDetail{
    username:string;
       email:string | null;
    userImage:string |null;
    id:string;
    // facebook:string | null;
    // x:string | null;
    // github:string| null
    // instagram:string |null;
    // mobileNum:number | null;

}



export interface ForumWithCount extends Forum {
    _count: { forumLikes: number; comments?: number };
  }
  
  export interface UserProfilePostsProps {
    forums: ForumWithCount[];
    userLikes: ForumLike[];
  }