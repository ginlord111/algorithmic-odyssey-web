import React, { ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
const Header = ({children, className}:{children?:ReactNode, className?:string}) => {
  return (
    <div className={cn("md:h-[50vh] h-[100vh] relative flex flex-col", className)}>
        {/* TODO: USE DIFFERENT IMAGE PER LOAD JUST LIKE GODOT WEBSITE */}
    <Image
      src="https://img.itch.zone/aW1hZ2UvOTMyNjc3LzU0NzM5MjMuZ2lm/347x500/dFxgtd.gif"
      alt="Animated GIF"
      className="brightness-50 object-cover"
      fill
      priority
    />
    {children}
  </div>
  )
}

export default Header