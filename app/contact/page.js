"use client"
import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import { VStack } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Stack, HStack, Box } from '@chakra-ui/react'

export default function page() {
    
  // Client-side-only code

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_67glr9s', 'template_pjvw1v7', e.target, 'CDJm1b-pxFetEtCMQ')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();}
          
  return (
    
  // Client-side-only code

    <HStack>
   
      <Box>
      <Card maxW="sm">
      <CardBody>
      <form onSubmit={sendEmail}>
      <VStack>
        
      <label>Your Name:</label>
      <Input type="text" name="user_name" width='auto' focusBorderColor="lime" />
      <label>Your Email:</label>
      <Input type="email" name="user_email" width='auto' focusBorderColor="lime" />
      <label>Write a Message:</label>
      <Textarea name="message" width="auto" focusBorderColor="lime" />
      <Button type="submit" value="Send" colorScheme='red' _hover={{color:"black"}} >Submit
    
      </Button>
      
    
      </VStack>
      </form>
      </CardBody>
      

    </Card>
      </Box>
    </HStack>
    
    
      
    
  )
}
