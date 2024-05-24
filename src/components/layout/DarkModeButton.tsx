"use client"
import React from 'react'
import { Sun,Moon  } from 'lucide-react';
import {Switch} from "@nextui-org/react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
const DarkModeButton = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState<boolean>(false)
    console.log(theme, "THEMEEEE")
    useEffect(() => {
        setMounted(true)
      }, [])
    
      if(!mounted) return null
  return (
    <Switch
      defaultSelected
      size="lg"
      color="default"
      startContent={<Sun />}
      endContent={<Moon />}
    onValueChange={(isSelected)=>setTheme((theme)=>isSelected ? "dark" : "light")}
    >
    </Switch>
  )
}

export default DarkModeButton