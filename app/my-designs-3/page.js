'use client'
To add copy to clipboard and edit options to each block of history, you can make the following modifications to the code:

```jsx
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
import { MdContentCopy, MdSave, MdEdit } from 'react-icons/md';

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
  const [editingIndex, setEditingIndex] = useState(-1);

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

  useEffect(() => {
    // Automatically start listening for speech input when the component mounts
    startRecording();

    // Stop listening when the component unmounts
    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = () => {
    recognition = new window.webkitSpeechRecognition();
    recognition.onstart = () => {
      setIsRecording(true);
    };
    recognition.onresult = event => {
      const result = event.results[0][0].transcript;
      setTranscribedText(result);
      saveTranscription(result);
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

  const copyToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const saveTranscription = (text) => {
    if (text) {
      setTranscriptionHistory(prevHistory => [
        text,
        ...prevHistory,
      ]);
    }
  };

  const editTranscription = (index, text) => {
    setEditingIndex(index);
    setTranscribedText(text);
  };

  const saveEditedTranscription = () => {
    if (editingIndex !== -1) {
      const updatedHistory = [...transcriptionHistory];
      updatedHistory[editingIndex] = transcribedText;
      setTranscriptionHistory(updatedHistory);
      setEditingIndex(-1);
      setTranscribedText('');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
    setTranscribedText('');
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
      {isRecording ? (
        <Button
          colorScheme="primary"
          onClick={stopRecording}
          size="lg"
        >
          Stop Recording
        </Button>
      ) : (
        <Button
          colorScheme="primary"
          onClick={startRecording}
          size="lg"
        >
          Start Recording
        </Button>
      )}
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
            value={transcribedText}
            onChange={e => setTranscribedText(e.target.value)}
          />
          {editingIndex === -1 ? (
            <>
              <Button
                onClick={() => copyToClipboard(transcribedText)}
                position="absolute"
                top="0"
                right="35px"
                size="sm"
                variant="ghost"
              >
                <Icon as={MdContentCopy} color="primary.500" />
              </Button>
              <Button
                onClick={() => editTranscription(0, transcribedText)}
                position="absolute"
                top="0"
                right="0"
                size="sm"
                variant="ghost"
              >
                <Icon as={MdEdit} color="primary.500" />
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={saveEditedTranscription}
                position="absolute"
                top="0"
                right="35px"
                size="sm"
                variant="ghost"
              >
                Save
              </Button>
              <Button
                onClick={cancelEdit}
                position="absolute"
                top="0"
                right="0"
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </>
          )}
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
            {editingIndex === index ? (
              <Input
                value={transcribedText}
                onChange={e => setTranscribedText(e.target.value)}
              />
            ) : (
              item
            )}
            {editingIndex === index ? (
              <>
                <Button
                  onClick={() => saveEditedTranscription()}
                  size="sm"
                  variant="ghost"
                  mt={2}
                  colorScheme="primary"
                >
                  Save
                </Button>
                <Button
                  onClick={() => cancelEdit()}
                  size

="sm"
                  variant="ghost"
                  mt={2}
                  colorScheme="red"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => copyToClipboard(item)}
                  size="sm"
                  variant="ghost"
                  mt={2}
                >
                  <Icon as={MdContentCopy} color="primary.500" />
                </Button>
                <Button
                  onClick={() => editTranscription(index, item)}
                  size="sm"
                  variant="ghost"
                  mt={2}
                >
                  <Icon as={MdEdit} color="primary.500" />
                </Button>
              </>
            )}
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
```

In this updated code:

- The `editingIndex` state is introduced to keep track of which block of history is currently being edited. When you click the "Edit" button, it sets the `editingIndex` to the corresponding index.

- The "Save" and "Cancel" buttons are displayed in each block of history when it is being edited, allowing you to save the changes or cancel the edit.

- The "Edit" button is also added to each block of history, which allows you to enter edit mode for that specific block.

With these modifications, you can copy, edit, and save individual blocks of history in the transcription history list.
