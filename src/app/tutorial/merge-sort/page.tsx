import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const page = () => {
    const MergeSortAlgorithm = dynamic(() => import('../_components/MergeSortAlgorithm'), { ssr: false })
  return (
   <Fragment>
    <MergeSortAlgorithm />
   </Fragment>
  )
}

export default page