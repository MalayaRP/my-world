"use client"
import React, { useState } from 'react';
import {
  VStack,
  Box,
  Button,
  Input,
  Text,
  ChakraProvider,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

function App() {
  const [data, setData] = useState([]);
  const [xValue, setXValue] = useState('');
  const [yValue, setYValue] = useState('');

  const handleAddData = () => {
    if (xValue && yValue) {
      setData([...data, { x: parseFloat(xValue), y: parseFloat(yValue) }]);
      setXValue('');
      setYValue('');
    }
  };

  return (
    <ChakraProvider>
      <VStack spacing={4} alignItems="center" marginTop="20px">
        <Text fontSize="xl">Plotting App</Text>
        <Box>
          <Input
            type="number"
            placeholder="Enter X value"
            value={xValue}
            onChange={(e) => setXValue(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Enter Y value"
            value={yValue}
            onChange={(e) => setYValue(e.target.value)}
          />
          <Button colorScheme="teal" onClick={handleAddData}>
            Add Data Point
          </Button>
        </Box>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" />
        </LineChart>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
