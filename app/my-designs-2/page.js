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
        <Input
          placeholder="Take a note..."
          value={note}
          onChange={handleNoteChange}
          size="lg"
          width="80%" // Adjust the input width
        />
        <Button onClick={handleSaveNote} colorScheme="teal" size="lg">
          Save Note
        </Button>
        <UnorderedList>
          {notes.map((savedNote, index) => (
            <ListItem
              key={index}
              borderBottom="1px solid #ccc" // Add a border to separate notes
              padding="1px" // Add some padding to notes
              width="80%" // Adjust the note width
            >
              {savedNote}
            </ListItem>
          ))}
        </UnorderedList>
      </VStack>
    </ChakraProvider>
  );
}

export default App;


