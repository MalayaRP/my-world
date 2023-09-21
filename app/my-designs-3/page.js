'use client'
import React, { useState, useEffect } from 'react';
import {
  VStack,
  Box,
  Text,
  Button,
  ChakraProvider,
  extendTheme,
  CSSReset,
  Icon,
  Input,
} from '@chakra-ui/react';
import { MdContentCopy, MdSave } from 'react-icons/md';

const theme = extendTheme({
  fonts: {
    heading: 'Arial, sans-serif',
    body: 'Arial, sans-serif',
  },
  colors: {
    primary: {
      500: '#FF5733', // Change to your preferred primary color
    },
    background: '#F2F2F2', // Change to your preferred background color
    text: '#333', // Change to your preferred text color
  },
});

const AudioToTextConverter = () => {
  const [transcribedText, setTranscribedText] = useState('');
  const [transcriptionHistory, setTranscriptionHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Load transcription history from local storage on app start
    const savedTranscriptions = localStorage.getItem('transcriptionHistory');
    if (savedTranscriptions) {
      setTranscriptionHistory(JSON.parse(savedTranscriptions));
    }
  }, []);

  useEffect(() => {
    // Save transcription history to local storage whenever it changes
    localStorage.setItem(
      'transcriptionHistory',
      JSON.stringify(transcriptionHistory)
    );
  }, [transcriptionHistory]);

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
      saveTranscription();
    };
    recognition.start();
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
      saveTranscription();
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

  const saveTranscription = () => {
    if (transcribedText) {
      setTranscriptionHistory(prevHistory => [
        transcribedText,
        ...prevHistory,
      ]);
      setTranscribedText('');
    }
  };

  const saveToFile = () => {
    const textToSave = transcriptionHistory.join('\n');
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcribed_text.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
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
        <Box
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="md"
          position="relative"
        >
          <Text fontWeight="bold" color="primary.500">
            Transcribed Text:
          </Text>
          <Input
            defaultValue={transcribedText}
            onChange={e => setTranscribedText(e.target.value)}
          />
          <Button
            onClick={copyToClipboard}
            position="absolute"
            top="0"
            right="35px"
            size="sm"
            variant="ghost"
          >
            <Icon as={MdContentCopy} color="primary.500" />
          </Button>
          <Button
            onClick={saveTranscription}
            position="absolute"
            top="0"
            right="0"
            size="sm"
            variant="ghost"
          >
            <Icon as={MdSave} color="primary.500" />
          </Button>
        </Box>
      )}
      <Box
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="md"
        w="100%"
        maxH="200px"
        overflowY="auto"
      >
        <Text fontWeight="bold" color="primary.500">
          Transcription History:
        </Text>
        {transcriptionHistory.map((item, index) => (
          <Box key={index} borderWidth="1px" p={2} mt={2} borderRadius="md">
            {item}
          </Box>
        ))}
        {transcriptionHistory.length > 0 && (
          <Button
            onClick={saveToFile}
            size="sm"
            mt={2}
            variant="outline"
            colorScheme="primary"
          >
            Save Transcription History
          </Button>
        )}
      </Box>
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
