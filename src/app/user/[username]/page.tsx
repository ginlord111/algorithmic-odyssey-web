import React from 'react'
import ProfilePage from './_components/ProfilePage'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import prisma from '@/db'
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
      userImage:true, /// THIS IS TEMPORARY FIELD WILL ADD SOONER
    }
  })
  if(!user)return;
  return (
    <div>
      <ProfilePage {...user}/>
    </div>
  )
}

export default Profile