'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { VStack, Box, Text, Button, ChakraProvider } from '@chakra-ui/react';

function App() {
  const gridSize = 10;
  const initialSnake = [{ x: 5, y: 5 }];
  const initialFood = { x: 8, y: 8 };
  const initialDirection = 'RIGHT';
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState(initialDirection);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleKeyPress = useCallback(
    (e) => {
      if (!gameStarted) {
        // Start the game when any key is pressed
        setGameStarted(true);
      }

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    },
    [direction, gameStarted]
  );

  const handleTouchStart = useCallback(
    (e) => {
      const touchStartX = e.touches[0].clientX;
      const touchStartY = e.touches[0].clientY;

      document.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const dx = touchX - touchStartX;
        const dy = touchY - touchStartY;

        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal swipe
          if (dx > 0 && direction !== 'LEFT') setDirection('RIGHT');
          else if (dx < 0 && direction !== 'RIGHT') setDirection('LEFT');
        } else {
          // Vertical swipe
          if (dy > 0 && direction !== 'UP') setDirection('DOWN');
          else if (dy < 0 && direction !== 'DOWN') setDirection('UP');
        }
      });

      document.addEventListener('touchend', () => {
        document.removeEventListener('touchmove', handleTouchMove);
      });
    },
    [direction]
  );

  useEffect(() => {
    if (gameOver) return;

    const handleGameTick = () => {
      // Game logic (same as before)
    };

    const intervalId = setInterval(handleGameTick, 200); // Adjust the interval for game speed

    return () => {
      clearInterval(intervalId);
    };
  }, [direction, snake, food, gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [handleKeyPress, handleTouchStart]);

  return (
    <ChakraProvider>
      <VStack spacing={4} align="center">
        <Text fontSize="24px">Snake Game</Text>
        {!gameStarted ? (
          <Box>
            <Text fontSize="18px" textAlign="center" mb={4}>
              Use arrow keys or swipe on the screen to control the snake.
            </Text>
            <Text fontSize="16px" textAlign="center" mb={4}>
              Eat the red squares to grow the snake. Avoid collisions with the walls and yourself.
            </Text>
            <Button onClick={() => setGameStarted(true)} colorScheme="teal" size="lg">
              Start Game
            </Button>
          </Box>
        ) : (
          <>
            <Box display="grid" gridTemplateColumns={`repeat(${gridSize}, 1fr)`}>
              {/* Game grid rendering (same as before) */}
            </Box>
            {gameOver && <Text fontSize="24px">Game Over!</Text>}
          </>
        )}
      </VStack>
    </ChakraProvider>
  );
}

export default App;
