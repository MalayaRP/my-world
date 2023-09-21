'use client'
import React, { useState } from 'react';
import { VStack, Box, Text, Button, ChakraProvider, extendTheme, CSSReset } from '@chakra-ui/react';

const theme = extendTheme();

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
    <VStack spacing={4}>
      <Box>
        {isRecording ? (
          <Text>Recording...</Text>
        ) : (
          <Text>Click the button to start recording</Text>
        )}
      </Box>
      <Button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
      {transcribedText && (
        <Box>
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
