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
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { FaTrash, FaCheck, FaCircle, FaCheckCircle } from 'react-icons/fa';

function App() {
  const { colorMode } = useColorMode(); // Get the current color mode (light/dark)
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [priority, setPriority] = useState(1);

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
      setNotes([...notes, { text: note, priority, completed: false }]);
      setNote('');
      setPriority(1);
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const handleCompleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].completed = !updatedNotes[index].completed;
    setNotes(updatedNotes);
  };

  // Sort notes by priority (high to low) and completed status (incomplete to complete)
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.completed === b.completed) {
      return b.priority - a.priority;
    }
    return a.completed ? 1 : -1;
  });

  return (
    <ChakraProvider>
      <VStack spacing={4} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          My Todo App
        </Text>
        <Box
          bg={colorMode === 'dark' ? 'gray.700' : 'white'}
          color={colorMode === 'dark' ? 'white' : 'black'}
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
            max={5}
            step={1}
            size="lg"
            mt={2}
          >
            <SliderTrack bg={colorMode === 'dark' ? 'gray.500' : 'gray.100'}>
              <SliderFilledTrack
                bg={colorMode === 'dark' ? 'teal.400' : 'teal.600'}
              />
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
        {sortedNotes.length > 0 && (
          <UnorderedList width="80%" spacing={2} mt={4}>
            {sortedNotes.map((savedNote, index) => (
              <ListItem
                key={index}
                borderBottom="1px solid #ccc"
                padding="4px"
                borderRadius="md"
                bg={colorMode === 'dark' ? 'gray.700' : 'white'}
                color={colorMode === 'dark' ? 'white' : 'black'}
                _hover={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.100' }}
                display="flex"
                alignItems="center"
              >
                <IconButton
                  icon={savedNote.completed ? <FaCheckCircle /> : <FaCircle />}
                  aria-label="Completed"
                  variant="outline"
                  colorScheme="teal"
                  size="sm"
                  mr={2}
                  onClick={() => handleCompleteNote(index)}
                />
                <Box flex="1" ml={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    Priority: {savedNote.priority}
                  </Text>
                  {savedNote.text}
                </Box>
                <IconButton
                  icon={<FaTrash />}
                  aria-label="Delete"
                  onClick={() => handleDeleteNote(index)}
                  variant="ghost"
                  colorScheme="red"
                />
              </ListItem>
            ))}
          </UnorderedList>
        )}
        <Button
          onClick={() => setNotes([])}
          colorScheme="red"
          size="lg"
          mt={4}
          width="80%"
        >
          Clear All
        </Button>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
