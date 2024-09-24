import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const page = () => {
    const LinearSearchAlgorithm = dynamic(() => import('../_components/LinearSearchAlgorithm'), { ssr: false })
  return (
   <Fragment>
    <LinearSearchAlgorithm />
   </Fragment>
  )
}

export default page