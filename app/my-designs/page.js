"use client"
import React, { useState, useEffect } from 'react';
import { VStack, Box, Button, Input, Text } from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';

export default function QuestionAnsweringApp() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const questions = [
    "What's your name?",
    "How does photosynthesis work?",
    "Ask a question...",
  ];

  // Simple question-answering function (replace with your logic)
  const getAnswer = (questionText) => {
    // Basic question-answering logic here (e.g., hardcoded answers)
    switch (questionText.toLowerCase()) {
      case "what's your name?":
        return "My name is Assistant.";
      case 'how does photosynthesis work?':
        return 'Photosynthesis is the process by which plants convert sunlight into energy.';
      default:
        return "I'm sorry, I don't know the answer to that question.";
    }
  };

  const [introIndex, setIntroIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIntroIndex((prevIndex) =>
        prevIndex === questions.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change text every 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  const handleQuestionSubmit = () => {
    const answerText = getAnswer(question);
    setAnswer(answerText);
  };

  return (
    <VStack spacing="4" align="center">
      {/* Animated Introduction */}
      <Typewriter
        options={{
          strings: [questions[introIndex]],
          autoStart: true,
          loop: true,
        }}
      />
      <br />

      {/* Text Input */}
      <Input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* Button to submit the question */}
      <Button onClick={handleQuestionSubmit}>Ask</Button>

      {/* Display the answer */}
      {answer && (
        <Box>
          <Text fontWeight="bold">Answer:</Text>
          <Text>{answer}</Text>
        </Box>
      )}
    </VStack>
  );
}
