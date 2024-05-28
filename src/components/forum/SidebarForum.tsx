import Link from 'next/link'
import React from 'react'

const SidebarForum = () => {
  return (
    <div className='absolute h-screen w-[300px]'>
        <div className='mt-20 px-10  flex flex-col '>
        <Link href="/new">
            Create Post
        </Link>
        </div>
    </div>
  )
}

export default SidebarForum