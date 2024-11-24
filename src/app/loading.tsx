'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const Loader = () => {
  const [blurredBackground, setBlurredBackground] = useState(false)

  useEffect(() => {
    setBlurredBackground(true) 

    // Prevent background scrolling
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      {blurredBackground ? (
        <div className="absolute inset-0 backdrop-blur-md" />
      ) : (
        <div className="absolute inset-0 bg-white" />
      )}
      <div className="relative z-10 flex flex-col items-center">
        <Image
          src="/loader2-character.png"
          alt="Loading..."
          width={400}
          height={300}
          priority
        />
        <p className="mt-4 text-2xl font-bold text-gray-800 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  )
}

export default Loader
