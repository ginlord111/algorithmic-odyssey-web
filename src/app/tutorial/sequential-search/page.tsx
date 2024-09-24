import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const page = () => {
    const SequentialSearch = dynamic(() => import('../_components/SequentialSearch'), { ssr: false })
  return (
   <Fragment>
    <SequentialSearch />
   </Fragment>
  )
}

export default page