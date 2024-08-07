import React, { Fragment } from 'react'
import AuthContainer from './_components/AuthContainer'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
const AuthPage = async() => {
  const session = await getServerSession(authOptions);
  if(session && session.user.id){
    return redirect("/");
  }
  return (
   <Fragment >
    <AuthContainer />
   </Fragment>
  )
}

export default AuthPage