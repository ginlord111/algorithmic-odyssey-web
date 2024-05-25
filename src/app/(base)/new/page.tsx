import React from 'react'
import { Fragment } from 'react'
import CreatePost from './_components/CreatePost'
import Header from '@/components/layout/Header'
const page = () => {
  return (
 <Fragment>
  <Header />
    <CreatePost />
 </Fragment>
  )
}

export default page