import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const page = () => {
    const SelectionSortAlgorithm = dynamic(() => import('../_components/SelectionSortAlgorithm'), { ssr: false })
  return (
   <Fragment>
    <SelectionSortAlgorithm />
   </Fragment>
  )
}

export default page