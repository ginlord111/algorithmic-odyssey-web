
import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const page = () => {
    const DepthFirst = dynamic(() => import('../_components/DepthFirst'), { ssr: false })
  return (
   <Fragment>
    <DepthFirst />
   </Fragment>
  )
}

export default page
