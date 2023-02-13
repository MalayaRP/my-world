import React from 'react'
import {Button} from "@chakra-ui/button"
import {useColorMode} from "@chakra-ui/color-mode"
import {SunIcon, MoonIcon} from "@chakra-ui/icons"
export default function ToggleColorMode() {
    const {colorMode, toggleColorMode} = useColorMode();
  return (
   
      <Button onClick={() => toggleColorMode()}
      pos="absolute"
      top="2"
      right="100"
      m="2rem"
      >{colorMode ==="dark"? <SunIcon/>: <MoonIcon/>}</Button>
   
  )
}
