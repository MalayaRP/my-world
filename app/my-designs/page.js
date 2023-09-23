"use client"
import React, { useState, useEffect } from 'react';
import {
  VStack,
  Box,
  Button,
  ChakraProvider,
  Text,
} from '@chakra-ui/react';

const questions = [
  {
    question: 'You find a fork in the road. Do you go left or right?',
    options: ['Left', 'Right'],
    correctAnswer: 'Right',
  },
  {
    question: 'You come across a river. Do you swim across or find a bridge?',
    options: ['Swim across', 'Find a bridge'],
    correctAnswer: 'Find a bridge',
  },
  {
    question: 'You encounter a locked door. Do you pick the lock or find a key?',
    options: ['Pick the lock', 'Find a key'],
    correctAnswer: 'Find a key',
  },
  {
    question: 'You see a dragon guarding the castle. Do you approach it or find another way in?',
    options: ['Approach the dragon', 'Find another way in'],
    correctAnswer: 'Find another way in',
  },
  {
    question: 'You find a treasure chest. Do you open it or leave it?',
    options: ['Open it', 'Leave it'],
    correctAnswer: 'Open it',
  },
  {
    question: 'You are in a dark cave. Do you use a torch or proceed in darkness?',
    options: ['Use a torch', 'Proceed in darkness'],
    correctAnswer: 'Use a torch',
  },
  {
    question: 'You encounter a talking frog. Do you kiss it or ignore it?',
    options: ['Kiss it', 'Ignore it'],
    correctAnswer: 'Kiss it',
  },
  {
    question: 'You reach a high cliff. Do you climb down or find another path?',
    options: ['Climb down', 'Find another path'],
    correctAnswer: 'Find another path',
  },
  {
    question: 'You hear a strange noise in the forest. Do you investigate or run away?',
    options: ['Investigate', 'Run away'],
    correctAnswer: 'Investigate',
  },
  {
    question: 'You encounter a friendly squirrel. Do you trust it or be cautious?',
    options: ['Trust it', 'Be cautious'],
    correctAnswer: 'Be cautious',
  },
];

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [story, setStory] = useState(
    "Once upon a time, in a distant kingdom, a princess was captured by a fearsome dragon. You, the brave adventurer, have set out on a quest to rescue her. Your journey is filled with challenges and decisions. Make the right choices to save the princess!"
  );

  const backgroundMusicUrl = 'https://cdn.pixabay.com/download/audio/2022/01/05/audio_51e67495bc.mp3'; // Replace with your music URL

  const playSuccessSound = () => {
    const successSound = new Audio('/success.mp3');
    successSound.play();
  };

  const playFailureSound = () => {
    const failureSound = new Audio('/failure.mp3');
    failureSound.play();
  };

  const playBackgroundMusic = () => {
    const backgroundMusic = new Audio(backgroundMusicUrl);
    backgroundMusic.loop = true;
    backgroundMusic.play();
  };

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[questionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
      playSuccessSound();
    } else {
      playFailureSound();
      setGameOver(true);
    }

    if (questionIndex === questions.length - 1) {
      setGameOver(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const restartGame = () => {
    setQuestionIndex(0);
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    playBackgroundMusic(); // Start playing background music when the component mounts

    return () => {
      // Cleanup when the component unmounts
      const backgroundMusic = new Audio(backgroundMusicUrl);
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, []); // Empty dependency array to run this effect only once

  useEffect(() => {
    if (gameOver) {
      // Game over logic (e.g., show a message or play a sound)
    }
  }, [gameOver]);

  return (
    <ChakraProvider>
      <VStack spacing={4} align="center">
        <Box>
          {gameOver ? (
            <div>
              <h2>Game Over!</h2>
              <p>Your Score: {score} / {questions.length}</p>
              <Button onClick={restartGame}>Restart Game</Button>
            </div>
          ) : (
            <div>
              <Text fontSize="xl" mb={4}>{story}</Text>
              <h2>Question {questionIndex + 1}</h2>
              <p>{questions[questionIndex].question}</p>
              {questions[questionIndex].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
        </Box>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
