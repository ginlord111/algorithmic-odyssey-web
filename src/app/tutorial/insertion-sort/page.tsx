import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const page = () => {
    const InsertionAlgorithm = dynamic(() => import('../_components/InsertionAlgorithm'), { ssr: false })
  return (
   <Fragment>
    <InsertionAlgorithm />
   </Fragment>
  )
}

export default page