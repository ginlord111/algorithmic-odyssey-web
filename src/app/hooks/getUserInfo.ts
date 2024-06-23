import { fetchUserProfile } from "@/actions/actions";
import { User } from "@prisma/client";
import { create } from "zustand";
interface UserInfoProps {
  fetchUser: () => Promise<User>;
  user?: User;
}

const userInfo = create<UserInfoProps>((set) => ({
  fetchUser: async () => {
    const user = await fetchUserProfile();
    set({ user });
    return user as User;
  }
}));

export default userInfo;
