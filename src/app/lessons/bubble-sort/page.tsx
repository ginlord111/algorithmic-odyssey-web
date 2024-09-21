import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const page = () => {
    const BubbleSortAlgorithm = dynamic(() => import('../_components/BubbleSortAlgorithm'), { ssr: false })
  return (
   <Fragment>
    <BubbleSortAlgorithm />
   </Fragment>
  )
}

export default page