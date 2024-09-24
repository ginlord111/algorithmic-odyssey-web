import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const page = () => {
    const BreadthFirst = dynamic(() => import('../_components/BreadthFirst'), { ssr: false })
  return (
   <Fragment>
    <BreadthFirst />
   </Fragment>
  )
}

export default page