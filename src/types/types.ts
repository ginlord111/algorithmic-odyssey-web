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
interface AlgoProps{
  merge_sort:string;
  quick_sort:string;
  bubble_sort:string;
  binary_search:string;
  linear_search:string;
  insertion_sort:string;
  selection_sort:string;
  sequential_search:string;
  depth_first_search:string;
  euclidean_algorithm:string;
  breadth_first_search:string;
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

  export interface LessonProgressProps {
    progress:AlgoProps[];
  }

  interface Level {
    points: number;
    hintsUsed: number;
    levelName: string;
    isCompleted: boolean;
  }
  
  export interface GameState {
    levels: Level[];
  }

export type UserRole = "student" | "teacher"
  export type NavClasState = "announcement" | "pending-task" | "graded-task" | "classwork";

export type NavActState = "instruction" | "students-work" | "works" | "compiler"