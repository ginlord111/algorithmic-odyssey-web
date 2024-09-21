import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const page = () => {
    const BinarySearch = dynamic(() => import('../_components/BinarySearch'), { ssr: false })
  return (
   <Fragment>
    <BinarySearch />
   </Fragment>
  )
}

export default page