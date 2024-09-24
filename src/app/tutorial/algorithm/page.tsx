import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const page = () => {
    const AlgortihmLesson = dynamic(() => import('../_components/AlgorithmLesson'), { ssr: false })
  return (
   <Fragment>
    <AlgortihmLesson />
   </Fragment>
  )
}

export default page