import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const page = () => {
    const KnuthMorrisPratt = dynamic(() => import('../_components/KnuthMorrisPratt'), { ssr: false })
  return (
   <Fragment>
    <KnuthMorrisPratt />
   </Fragment>
  )
}

export default page