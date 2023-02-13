"use client"
import React from 'react'
import Image from 'next/image'
import { Stack, VStack, HStack, Box } from '@chakra-ui/react'
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
  } from '@chakra-ui/react'
import {CheckCircleIcon} from "@chakra-ui/icons"
export default function page() {
  return (
  // Client-side-only code

    <HStack spacing="10px">
        <Box>
        <Image src={require("../../public/course2.gif")} style={{margin:"left", height:"400px", width:"400px"}} alt="reading"/>
        </Box>
        <Box>
        <List spacing={3}>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    Chemistry: Msc in chemistry from IIT Bombay (2019-2021)
  </ListItem>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    Computer Science: Python, Github, Git, Docker, SQL, HTML, CSS, JavaScript, React, Next.js (2021-2022)
  </ListItem>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    Management: Product Management (2023)
  </ListItem>
</List>
        </Box>
    </HStack>
      
  )
}
