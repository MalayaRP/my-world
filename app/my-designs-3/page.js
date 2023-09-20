'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { VStack, Box, Text, Button, ChakraProvider } from '@chakra-ui/react';

function App() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const [sequence, setSequence] = useState('');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastClickCorrect, setLastClickCorrect] = useState(true);

  // Generate a random sequence of letters
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    setSequence(alphabet.charAt(randomIndex));
  }, []);

  const handleButtonClick = useCallback(
    (letter) => {
      if (letter === sequence[currentLetterIndex]) {
        setCurrentLetterIndex(currentLetterIndex + 1);
        setLastClickCorrect(true);

        if (currentLetterIndex === sequence.length - 1) {
          setIsGameOver(true);
        }
      } else {
        setLastClickCorrect(false);
      }
    },
    [sequence, currentLetterIndex]
  );

  const restartGame = () => {
    setCurrentLetterIndex(0);
    setIsGameOver(false);
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    setSequence(alphabet.charAt(randomIndex));
    setLastClickCorrect(true);
  };

  return (
    <ChakraProvider>
      <VStack spacing={4}>
        <Box>
          <Text fontSize="xl">
            {isGameOver ? 'Congratulations! You Win!' : 'Guess the Special Letter:'}
          </Text>
          <Text fontSize="2xl">
            {isGameOver ? sequence : sequence.substr(0, currentLetterIndex)}
          </Text>
        </Box>
        <Box>
          {alphabet.split('').map((letter) => (
            <Button
              key={letter}
              onClick={() => handleButtonClick(letter)}
              isDisabled={isGameOver}
              colorScheme={lastClickCorrect ? 'teal' : 'red'} // Change button color based on correctness
            >
              {letter}
              {lastClickCorrect ? ' 😊' : ' 😢'} {/* Display happy or sad emoji */}
            </Button>
          ))}
        </Box>
        {isGameOver && (
          <Button colorScheme="teal" onClick={restartGame}>
            Restart
          </Button>
        )}
      </VStack>
    </ChakraProvider>
  );
}

export default App;
