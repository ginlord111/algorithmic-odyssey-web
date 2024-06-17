import React from 'react'
import ProfilePage from './_components/ProfilePage'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import prisma from '@/db'
import { User } from '@prisma/client'
const Profile = async({params}:{params:{username:string}}) => {
  const {username} = params
  const session = getServerSession(authOptions)
  const user = await prisma.user.findUnique({
    where:{
      username:username
    },
    select:{
      email:true,
      username:true,
      userImage:true,
      id:true,
       /// THIS IS TEMPORARY FIELD WILL ADD SOONER
    }
  })
  if(!user)return;
  return (
    <div>
      <ProfilePage {...user as User}/>
    </div>
  )
}

export default Profile