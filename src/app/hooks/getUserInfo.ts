import { fetchUserProfile } from '@/actions/get-user-profile';
import { User } from '@prisma/client';
import {create} from 'zustand';
interface UserInfoProps{
    fetchUser:()=>Promise<User>;
    user?:User;
}
async function getUser(){
const user = await fetchUserProfile()
return user as User
}


const userInfo = create<UserInfoProps>((set)=> ({fetchUser:async()=>{
const user = await fetchUserProfile()
set({user})
return user as User
}}))

export default userInfo;