"use client"
import React from "react"
import { download } from "3dmol";
import { createViewer } from "3dmol";
import Script from "next/script"
import { Stack, HStack, VStack, Box } from '@chakra-ui/react'
import Typewriter from 'typewriter-effect';

export default function Home() {
  <>
    <Script src="https://3Dmol.org/build/3Dmol-min.js"></Script>     
<Script src="https://3Dmol.org/build/3Dmol.ui-min.js"></Script></>
  
  return (
    
  // Client-side-only code

    <>
         
<HStack spacing='10px'>
  <Box>
  <div style={{height: "600px", width: "600px", position: "relative" }}className='viewer_3Dmoljs' data-pdb='4IRC' data-backgroundcolor='0xffffff' data-spin='axis:y;speed:0.5' data-style='cartoon:color=spectrum' data-backgroundalpha="0"> </div>

  </Box>
 
 

  <Box >
    <div style={{fontSize:"60px", fontFamily:"ariel", marginTop:"10px"}}>
    <Typewriter
  options={{
    strings: ['Hello, World !', 'I am Malaya','AI Researcher, Web Developer, & Computational Chemist ' ,'Wanna talk? drop a mail'],
    autoStart: true,
    loop: true,
  }}
/>
    </div>
  
  </Box>
</HStack>

    </>
  )
}
