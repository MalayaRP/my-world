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
import { Center } from '@chakra-ui/react'
export default function page() {
  return (
    if (typeof window !== "undefined") {
  // Client-side-only code

    <HStack>
      <Box>
      <Image src={require("../../public/chem.gif")} style={{margin:"auto", height:"300px", width:"300px"}} alt="chem"/>
      </Box>
      <Box>
      <List spacing={3}>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    Master's Thesis: Insilico-design of inhibitors targeting polymerase IV of E.coli bacteria
  </ListItem>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    Virtual Screening Tools: Schrodinger, Molsoft, Autodock vina, Cresset's SPARK, CCDC Gold
  </ListItem>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    Data extraction: Patents (Chemaxon's Chemcurator), Machine learning dataset from literatures and public domain databases
  </ListItem>
  <ListItem>
    <ListIcon as={CheckCircleIcon} color='green.500' />
    Molecular Dynamics Simulation: Amber, VMD
  </ListItem>
</List>
      </Box>
    </HStack>}
      
    
  )
}
