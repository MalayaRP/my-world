"use client"
import React from 'react'
import Image from 'next/image'
import { Center, Square, Circle } from '@chakra-ui/react'
import { Stack, VStack, Hstack, Box } from '@chakra-ui/react'
export default function page() {
  return (
    <Stack spacing="10px">
        <Box>
        <Image src={require("/public/ai.gif")} style={{margin:"auto", height:"200px", width:"200px"}} alt="reading"/>
        </Box>
        <Box>
            <Center style={{margin:"20px"}}>
        
            I have mainly implemented AI methods in drug discovery domain.
            
            In drug discovery, I focused my research on molecule generation, property prediction, and property optimisation tasks.
            
            I am always curious of latest work in these areas, so I keep track of latest publications and also implemented many state of the art models in my work.
            </Center>
            
            
            
        </Box>
    </Stack>
  )
}
