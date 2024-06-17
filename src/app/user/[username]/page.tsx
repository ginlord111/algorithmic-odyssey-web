import React from 'react'
import ProfilePage from './_components/ProfilePage'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import prisma from '@/db'
import { User } from '@prisma/client'
const Profile = async({params}:{params:{username:string}}) => {
  const {username} = params
  const user = await prisma.user.findUnique({
    where:{
      username:decodeURIComponent(username)
    },
  })
  if(!user)return;
  return (
    <div>
      <ProfilePage {...user as User}/>
    </div>
  )
}

export default Profile