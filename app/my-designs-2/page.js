'use client'
import React, { useState } from 'react';
import {
  VStack,
  Box,
  Button,
  Input,
  Text,
  ChakraProvider,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

function App() {
  const [note, setNote] = useState(''); // State to store the current note
  const [notes, setNotes] = useState([]); // State to store all saved notes

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSaveNote = () => {
    if (note.trim() !== '') {
      setNotes([...notes, note]); // Add the current note to the list of notes
      setNote(''); // Clear the input field after saving
    }
  };

  return (
    <ChakraProvider>
      <VStack spacing={4} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          My Note App
        </Text>
        <Box
          boxShadow="lg"
          p={4}
          borderRadius="md"
          width="80%"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Input
            placeholder="Take a note..."
            value={note}
            onChange={handleNoteChange}
            size="lg"
          />
          <Button
            onClick={handleSaveNote}
            colorScheme="teal"
            size="lg"
            mt={2}
            width="100%"
          >
            Save Note
          </Button>
        </Box>
        {notes.length > 0 && (
          <UnorderedList width="80%" spacing={2} mt={4}>
            {notes.map((savedNote, index) => (
              <ListItem
                key={index}
                borderBottom="1px solid #ccc"
                padding="4px"
                borderRadius="md"
                bg="white"
                _hover={{ bg: 'gray.100' }}
              >
                {savedNote}
              </ListItem>
            ))}
          </UnorderedList>
        )}
      </VStack>
    </ChakraProvider>
  );
}

export default App;
