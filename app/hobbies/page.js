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
        <Image src={require("../../public/hobby.gif")} style={{margin:"left", height:"400px", width:"400px"}} alt="reading"/>
        </Box>
        <Box>
        <List spacing={3}>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    On weekends I spend sometime on making youtube contents
  </ListItem>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    I read and watch plenty of news everyday on various topics 
  </ListItem>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    Singing is one of my hobby, I bet it can impress you
  </ListItem>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    Love to explore new places and new foods
  </ListItem>
</List>
        </Box>
    </HStack>
  )
}
