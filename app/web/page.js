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
  return (if (typeof window !== "undefined") {
  // Client-side-only code

    <HStack spacing="100px">
        <Box>
        <Image src={require("../../public/web.gif")} style={{margin:"left", height:"400px", width:"400px"}} alt="reading"/>
        </Box>
        <Box>
        <List spacing={3}>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    HTML
  </ListItem>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    CSS
  </ListItem>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    JavaScript
  </ListItem>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    React
  </ListItem>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    Next.js
  </ListItem>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    Streamlit
  </ListItem>
</List>
        </Box>
    </HStack>}
  )
}
