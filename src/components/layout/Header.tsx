import React from 'react'
import Image from 'next/image'
const Header = () => {
  return (
    <div className="md:h-[50vh] h-[100vh] relative flex flex-col">
        {/* TODO: USE DIFFERENT IMAGE PER LOAD JUST LIKE GODOT WEBSITE */}
    <Image
      src="https://img.itch.zone/aW1hZ2UvOTMyNjc3LzU0NzM5MjMuZ2lm/347x500/dFxgtd.gif"
      alt="Animated GIF"
      className="brightness-50 object-cover"
      fill
      priority
    />
  </div>
  )
}

export default Header