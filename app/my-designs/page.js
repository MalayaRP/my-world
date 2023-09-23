"use client"
import React, { useState } from 'react';
import {
  VStack,
  Box,
  Button,
  ChakraProvider,
} from '@chakra-ui/react';

function App() {
  const [points, setPoints] = useState([]);
  const [connecting, setConnecting] = useState(false);

  const handlePointClick = (e) => {
    if (!connecting) {
      const rect = e.target.getBoundingClientRect();
      const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
      const y = e.touches ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
      setPoints([...points, { x, y }]);
    }
  };

  const handleConnect = () => {
    if (points.length === 2) {
      setConnecting(true);
    }
  };

  const handleDrawLine = () => {
    setConnecting(false);
  };

  return (
    <VStack align="center" spacing={4}>
      <Box
        position="relative"
        width="500px"
        height="500px"
        border="1px solid #000"
        onTouchStart={handlePointClick}
        onMouseDown={handlePointClick}
      >
        {points.map((point, index) => (
          <Box
            key={index}
            position="absolute"
            left={`${point.x}px`}
            top={`${point.y}px`}
            width="10px"
            height="10px"
            borderRadius="50%"
            backgroundColor="#000"
          ></Box>
        ))}
        {connecting && (
          <svg>
            <line
              x1={points[0].x}
              y1={points[0].y}
              x2={points[1].x}
              y2={points[1].y}
              style={{ stroke: 'black', strokeWidth: 2 }}
            />
          </svg>
        )}
      </Box>
      <Button onClick={handleConnect} disabled={points.length !== 2}>
        Connect Points
      </Button>
      <Button onClick={handleDrawLine}>Draw Line</Button>
    </VStack>
  );
}

function Game() {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}

export default Game;
