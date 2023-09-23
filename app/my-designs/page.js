"use client"
import React, { useState, useEffect } from 'react';
import {
  VStack,
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  useColorMode,
} from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';

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
  // Add your remaining questions here
];

// Extend the Chakra UI theme to customize dark mode styles
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'black',
      },
    }),
  },
});

function Story({ onGameStart }) {
  return (
    <div>
      <Typewriter
        options={{
          strings: [
            "Once upon a time, in a distant kingdom, a princess was captured by a fearsome dragon. You, the brave adventurer, have set out on a quest to rescue her. Your journey is filled with challenges and decisions. Make the right choices to save the princess!"
          ],
          autoStart: true,
          loop: false,
        }}
      />
      <Button onClick={onGameStart} colorScheme="teal" mt="4">
        Start the Adventure
      </Button>
    </div>
  );
}

function Questions({ onAnswer, question, options }) {
  return (
    <div>
      <h2 style={{ color: 'green' }}>{question}</h2>
      {options.map((option, index) => (
        <Button
          key={index}
          onClick={() => onAnswer(option)}
          colorScheme="purple"
          size="lg"
          padding="12px 24px"
          mt="2"
        >
          {option}
        </Button>
      ))}
    </div>
  );
}

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const { colorMode } = useColorMode();

  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleGameStart = () => {
    setIsGameStarted(true);
    setQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    playBackgroundMusic(); // Start playing background music when the game starts
  };

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[questionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
      playSuccessSound(); // Play success sound for correct answers
    } else {
      playFailureSound(); // Play failure sound for incorrect answers
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
    playBackgroundMusic(); // Start playing background music when the game restarts
  };

  const playBackgroundMusic = () => {
    const backgroundMusicUrl = 'https://cdn.pixabay.com/download/audio/2022/01/05/audio_51e67495bc.mp3'; // Replace with your music URL
    const backgroundMusic = new Audio(backgroundMusicUrl);
    backgroundMusic.loop = true;
    backgroundMusic.play();
  };

  const playSuccessSound = () => {
    const successSoundUrl = 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_866d42f469.mp3'; // Replace with your success sound URL
    const successSound = new Audio(successSoundUrl);
    successSound.play();
  };

  const playFailureSound = () => {
    const failureSoundUrl = 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_e6710b8e79.mp3'; // Replace with your failure sound URL
    const failureSound = new Audio(failureSoundUrl);
    failureSound.play();
  };

  useEffect(() => {
    if (gameOver) {
      // Game over logic (e.g., show a message or play a sound)
      console.log('Game over!');
    }
  }, [gameOver]);

  return (
    <ChakraProvider theme={theme}>
      <VStack spacing={4} align="center">
        <Box
          padding="20px"
          fontFamily="Arial, sans-serif"
          borderRadius="10px"
          maxWidth="500px"
        >
          {isGameStarted ? (
            gameOver ? (
              <div>
                <h2 style={{ color: 'red' }}>Game Over!</h2>
                <p style={{ color: 'blue' }}>Your Score: {score} / {questions.length}</p>
                <Button onClick={restartGame} colorScheme="teal">
                  Restart Game
                </Button>
              </div>
            ) : (
              <Questions
                onAnswer={handleAnswer}
                question={questions[questionIndex].question}
                options={questions[questionIndex].options}
              />
            )
          ) : (
            <Story onGameStart={handleGameStart} />
          )}
        </Box>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
