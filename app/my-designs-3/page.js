'use client'
import React, { useState } from 'react';
import { VStack, Box, Text, Button, ChakraProvider, extendTheme, CSSReset, Icon, Input } from '@chakra-ui/react';
import { MdContentCopy } from 'react-icons/md';

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Roboto, sans-serif',
  },
  colors: {
    primary: {
      500: '#007bff',
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

  const copyToClipboard = () => {
    const textArea = document.createElement('textarea');
    textArea.value = transcribedText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
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
        <Box borderWidth="1px" p={4} borderRadius="md" position="relative">
          <Text fontWeight="bold">Transcribed Text:</Text>
          <Input
            defaultValue={transcribedText}
            onChange={e => setTranscribedText(e.target.value)}
          />
          <Button
            onClick={copyToClipboard}
            position="absolute"
            top="0"
            right="0"
            size="sm"
            variant="ghost"
          >
            <Icon as={MdContentCopy} />
          </Button>
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
