import React, { ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
const Header = ({children, className}:{children?:ReactNode, className?:string}) => {
  return (
    <div className={cn("md:h-[50vh] h-[40vh] relative flex flex-col", className)}>
        {/* TODO: USE DIFFERENT IMAGE PER LOAD JUST LIKE GODOT WEBSITE */}
    <Image
     src="/header-banner-2.gif"
      alt="Animated GIF"
      className="brightness-50 object-fill"
      fill
      priority
      unoptimized
    />
    {children}
  </div>
  )
}

export default Header