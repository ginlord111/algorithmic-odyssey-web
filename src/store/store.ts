import { fetchUserProfile } from "@/actions/actions";
import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { create } from "zustand";
interface UserInfoProps {
  fetchUser: () => Promise<User | null>;
  user: User | null;
}
interface watchNotifProps{
  notif:boolean,
  readNotif:(id:string)=>Promise<void>,
  notifOn:()=>void,
  notifOff:()=>void,
  commentNotif:(postOwner:string,title:string,postOwnerUsername:string,titleId:string)=>Promise<void>,
}

interface joinClassroomModalProps{
  isOpen:boolean;
  onOpen: ()=>void;
  onClose: ()=>void;
}

interface createClassroomModalProps{
  isOpen:boolean;
  onOpen: ()=>void;
  onClose: ()=>void;
}
const userInfo = create<UserInfoProps>((set) => ({
  user:null,
  fetchUser: async () => {
    try {
      const user = await fetchUserProfile();
      if (user) {
        set({ user });
        return user;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }
}));

export default userInfo;

export const watchNotif = create<watchNotifProps>((set) => ({
  notif:false,
  notifOn:()=> set(({notif:true})),
  notifOff:()=> set(({notif:false})),
  readNotif:async(id:string) => {
    await prisma.notifications.update({
      where:{
        id,
      },
      data:{
        isRead:true
      }
    })
  },
  commentNotif:async(postOwner:string,title:string,postOwnerUsername:string,titleId:string) => {
    const session = await getServerSession(authOptions)
    const user = await prisma.user.findUnique({
          where:{
            id:session?.user.id
          },
    });
    console.log(user, "THIS IS USERRRRRRRRRRRRRRRRRRRRRRRRRR")
    await prisma.notifications.create({
      data:{
        userId:postOwner,
        from: session?.user.id as string,
        fromUserImage:user?.userImage as string,    
        resourceId:`/forum${postOwnerUsername}/commments/${titleId}/${title}`,
        type:"comment",
        fromUsername:user?.username as string
      }
    })
  }

}));


export const joinClassroomModal = create<joinClassroomModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export const createClassroomModal = create<createClassroomModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));