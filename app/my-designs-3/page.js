'use client'
import React, { useState } from 'react';
import { VStack, Box, Text, Button, ChakraProvider, extendTheme, CSSReset } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Roboto, sans-serif',
  },
  colors: {
    primary: {
      500: '#007bff', // Change to your preferred primary color
    },
  },
});

const AudioToTextConverter = () => {
  const [transcribedText, setTranscribedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  let recognition = null;

  const startRecording = () => {
    recognition = new window.webkitSpeechRecognition();
    recognition.onstart = () => {
      setIsRecording(true);
    };
    recognition.onresult = event => {
      const result = event.results[0][0].transcript;
      setTranscribedText(result);
    };
    recognition.onend = () => {
      setIsRecording(false);
    };
    recognition.start();
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <VStack spacing={4} align="center">
      <Box
        bg="primary.500"
        color="white"
        p={4}
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        w="100%"
      >
        <Text fontSize="xl" fontWeight="bold">
          Voice to Text App
        </Text>
      </Box>
      <Button
        colorScheme="primary"
        onClick={isRecording ? stopRecording : startRecording}
        size="lg"
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
      {transcribedText && (
        <Box borderWidth="1px" p={4} borderRadius="md">
          <Text fontWeight="bold">Transcribed Text:</Text>
          <Text>{transcribedText}</Text>
        </Box>
      )}
    </VStack>
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AudioToTextConverter />
    </ChakraProvider>
  );
}

export default App;
