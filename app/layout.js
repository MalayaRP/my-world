"use client"
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
export default function RootLayout({ children }) {
  if(typeof window !== 'undefined'){
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body><ChakraProvider><Navbar/>{children}<Footer/></ChakraProvider></body>
    </html>
  )}
}
