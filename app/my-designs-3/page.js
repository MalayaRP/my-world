'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { VStack, Box, Button, Text, ChakraProvider } from '@chakra-ui/react';

function App() {
  const gridSize = 10;
  const initialSnake = [{ x: 5, y: 5 }];
  const initialFood = { x: 8, y: 8 };
  const initialDirection = 'RIGHT';
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState(initialDirection);
  const [gameOver, setGameOver] = useState(false);

  const handleKeyPress = useCallback(
    (e) => {
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
    [direction]
  );

  useEffect(() => {
    if (gameOver) return;

    const handleGameTick = () => {
      const newSnake = [...snake];
      let newHead = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          newHead.y--;
          break;
        case 'DOWN':
          newHead.y++;
          break;
        case 'LEFT':
          newHead.x--;
          break;
        case 'RIGHT':
          newHead.x++;
          break;
        default:
          break;
      }

      newSnake.unshift(newHead);

      if (newHead.x === food.x && newHead.y === food.y) {
        // Snake ate the food, generate new food
        const maxCoord = gridSize - 1;
        const newFood = {
          x: Math.floor(Math.random() * maxCoord),
          y: Math.floor(Math.random() * maxCoord),
        };
        setFood(newFood);
      } else {
        newSnake.pop(); // Remove the tail segment
      }

      // Check for collisions
      if (
        newHead.x < 0 ||
        newHead.x >= gridSize ||
        newHead.y < 0 ||
        newHead.y >= gridSize ||
        newSnake.slice(1).some((segment) => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setGameOver(true);
      } else {
        setSnake(newSnake);
      }
    };

    const intervalId = setInterval(handleGameTick, 200); // Adjust the interval for game speed

    return () => {
      clearInterval(intervalId);
    };
  }, [direction, snake, food, gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <ChakraProvider>
      <VStack spacing={4} align="center">
        <Text fontSize="24px">Snake Game</Text>
        <Box display="grid" gridTemplateColumns={`repeat(${gridSize}, 1fr)`}>
          {Array.from({ length: gridSize * gridSize }).map((_, index) => {
            const x = index % gridSize;
            const y = Math.floor(index / gridSize);
            const isSnakeSegment = snake.some((segment) => segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <Box
                key={index}
                w="30px"
                h="30px"
                bg={isSnakeSegment ? 'teal.500' : isFood ? 'red.500' : 'gray.200'}
                border="1px solid white"
              />
            );
          })}
        </Box>
        {gameOver && <Text fontSize="24px">Game Over!</Text>}
      </VStack>
    </ChakraProvider>
  );
}

export default App;

