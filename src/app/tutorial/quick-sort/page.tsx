import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const page = () => {
    const QuckSortAlgorithm = dynamic(() => import('../_components/QuckSortAlgorithm'), { ssr: false })
  return (
   <Fragment>
    <QuckSortAlgorithm />
   </Fragment>
  )
}

export default page