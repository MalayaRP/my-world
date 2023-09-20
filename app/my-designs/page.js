import React, { useState } from 'react';
import { VStack, Box, Button, Input, Text } from '@chakra-ui/react';

export default function QuestionAnsweringApp() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Simple question-answering function (replace with your logic)
  const getAnswer = (questionText) => {
    // Basic question-answering logic here (e.g., hardcoded answers)
    switch (questionText.toLowerCase()) {
      case 'what is your name?':
        return "My name is Assistant.";
      case 'how does photosynthesis work?':
        return "Photosynthesis is the process by which plants convert sunlight into energy.";
      default:
        return "I'm sorry, I don't know the answer to that question.";
    }
  };

  const handleQuestionSubmit = () => {
    const answerText = getAnswer(question);
    setAnswer(answerText);
  };

  return (
    <VStack spacing="4" align="center">
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
