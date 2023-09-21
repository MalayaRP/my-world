'use client'
import React, { useState, useEffect } from 'react';
import {
  VStack,
  Box,
  Button,
  Input,
  Text,
  ChakraProvider,
  UnorderedList,
  ListItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [priority, setPriority] = useState(1); // Initialize priority with a default value

  useEffect(() => {
    // Load saved notes from localStorage on component mount
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    // Save notes to localStorage whenever the notes state changes
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handleSaveNote = () => {
    if (note.trim() !== '') {
      setNotes([...notes, { text: note, priority }]);
      setNote('');
      setPriority(1); // Reset priority to default value after saving
    }
  };

  return (
    <ChakraProvider>
      <VStack spacing={4} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          My Todo App
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
            placeholder="Add a todo..."
            value={note}
            onChange={handleNoteChange}
            size="lg"
          />
          <Slider
            value={priority}
            onChange={handlePriorityChange}
            max={5} // Set the maximum priority value as needed
            step={1}
            size="lg"
            mt={2}
          >
            <SliderTrack bg="gray.100">
              <SliderFilledTrack bg="teal" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
          <Button
            onClick={handleSaveNote}
            colorScheme="teal"
            size="lg"
            mt={2}
            width="100%"
          >
            Save Todo
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
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    Priority: {savedNote.priority}
                  </Text>
                  {savedNote.text}
                </Box>
              </ListItem>
            ))}
          </UnorderedList>
        )}
      </VStack>
    </ChakraProvider>
  );
}

export default App;
