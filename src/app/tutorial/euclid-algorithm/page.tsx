import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const page = () => {
    const EuclidAlgorithm = dynamic(() => import('../_components/EuclidAlgorithm'), { ssr: false })
  return (
   <Fragment>
    <EuclidAlgorithm />
   </Fragment>
  )
}

export default page