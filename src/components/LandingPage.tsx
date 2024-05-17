import React from 'react'
import Image from 'next/image'
const LandingPage = () => {
  return (
    <div className=''> 
    <div className='h-screen'>
    <Image
      src="https://img.itch.zone/aW1hZ2UvOTMyNjc3LzU0NzM5MjMuZ2lm/347x500/dFxgtd.gif"
      alt="Animated GIF"
      className="brightness-50 object-cover"
      fill
    />
  </div>
  <div className='text-6xl font-bold text-white  flex items-center justify-center absolute top-[50%] mx-40'>
    This is description
  </div>
  </div>
  )
}

export default LandingPage