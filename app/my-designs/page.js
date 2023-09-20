"use client"
import React, { useState } from 'react';
import { VStack, Box, Button, Input, Text } from '@chakra-ui/react';

export default function QuestionAnsweringApp() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Function to fetch the answer
  const fetchAnswer = () => {
    const questionsAndAnswers = {
      'What is the capital of France?': 'Paris',
      'Who wrote "Romeo and Juliet"?': 'William Shakespeare',
      'What is the largest planet in our solar system?': 'Jupiter',
      'What is the boiling point of water in Celsius?': '100°C',
      'How many continents are there on Earth?': '7',
    };

    const foundAnswer = questionsAndAnswers[question];

    if (foundAnswer) {
      setAnswer(foundAnswer);
    } else {
      setAnswer('Answer not found for this question');
    }
  };

  return (
    <VStack spacing={4} align="center">
      <Box>
        <Text fontSize="xl">Question Answering Demo</Text>
      </Box>
      <Box>
        <Input
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </Box>
      <Box>
        <Button colorScheme="blue" onClick={fetchAnswer}>
          Get Answer
        </Button>
      </Box>
      <Box>
        <Text fontSize="lg">Answer:</Text>
        <Text>{answer}</Text>
      </Box>
    </VStack>
  );
}
