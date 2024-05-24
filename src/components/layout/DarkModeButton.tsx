"use client"
import React from 'react'
import { Sun,Moon  } from 'lucide-react';
import {Switch} from "@nextui-org/react";
import {useTheme} from "next-themes";
const DarkModeButton = () => {
    const { theme, setTheme } = useTheme()
  return (
    <Switch
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