"use client"
import React, { useState } from 'react';
import { VStack, Box, Button, Input, Text, ChakraProvider } from '@chakra-ui/react';

function App() {
  // Array of random text options
  const randomTextOptions = [
    "Hello, world!",
    "This is a random text.",
    "Chakra UI is awesome!",
    "Coding in React is fun!",
    "Random text generator",
    "Click again for more text.",
  ];

  const [randomText, setRandomText] = useState("Click the button to generate random text.");

  const generateRandomText = () => {
    const randomIndex = Math.floor(Math.random() * randomTextOptions.length);
    const newText = randomTextOptions[randomIndex];
    setRandomText(newText);
  };

  return (
    <ChakraProvider>
      <VStack spacing={4} align="center">
        <Text fontSize="24px">{randomText}</Text>
        <Button onClick={generateRandomText} colorScheme="teal" size="lg">
          Generate Random Text
        </Button>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
