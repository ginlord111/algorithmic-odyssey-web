import { Forum, ForumLike, User } from "@prisma/client";

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

export interface AlgoDataProps{
  name:string;
  href:string;
  icon:any;
}
export interface CommentProps {
  id: string;
  comment: string;
  username: string;
  createdAt: Date;
  userImage: string;
  hideComment: boolean;
}



export interface ForumWithCount extends Forum {
    _count: { forumLikes: number; comments?: number };
  }
  
  export interface UserProfilePostsProps {
    forums: ForumWithCount[];
    userLikes: ForumLike[];
  }
  export interface SearchResultProps {
    forumData: Forum[];
    userData: User[];
    filteredAlgoData:AlgoDataProps[];
  }

export type UserRole = "student" | "teacher"
  export type NavClasState = "announcement" | "pending-task" | "graded-task" | "classwork";

export type NavActState = "instruction" | "students-work" | "works" | "compiler"