"use client"
import React, { useState, useEffect } from 'react';
import {
  VStack,
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  useColorMode,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Image,
} from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';

const questions = [
  {
    question: 'You find a fork in the road. Do you go left or right?',
    options: ['Left', 'Right'],
    correctAnswer: 'Right',
    image: 'https://lh3.googleusercontent.com/drive-viewer/AITFw-ymmYcj7cadoWH6e7yJ65T02RkNoNnFi7TL0bcYs8GkIJpd7cEpoZ2ZlF7nhbkeRYbTWJ0fWvVSC4mLiZ2wKbk-a1PGgQ=s2560',
  },
  {
    question: 'You come across a river. Do you swim across or find a bridge?',
    options: ['Swim across', 'Find a bridge'],
    correctAnswer: 'Find a bridge',
    image: 'https://lh3.googleusercontent.com/drive-viewer/AITFw-zA7HMl4ncZc1GQm-5Z9lPSQfmEaxXoXJTkoQXhenNrwSq9f4OOSz1Psb20Y_9bym1ODILcGJgxzFKCQp9JsTV0QzC6mg=s2560',
  },
  {
    question: 'You encounter a locked door. Do you pick the lock or find a key?',
    options: ['Pick the lock', 'Find a key'],
    correctAnswer: 'Find a key',
    image: 'https://lh3.googleusercontent.com/drive-viewer/AITFw-zuZm5PmO8A-QLOUG9s0qwR9VZ3F6szsGt89xyTPPTwYn1fx_4wVAwU8-ahoMrWIT2GjVLtln7xQe00FkVaCSN-80kdTw=s2560',
  },
  {
    question: 'You see a dragon guarding the castle. Do you approach it or find another way in?',
    options: ['Approach the dragon', 'Find another way in'],
    correctAnswer: 'Find another way in',
    image: 'https://lh3.googleusercontent.com/drive-viewer/AITFw-yr6DtxcdMBAppWDfxBZqqGR9QqHid3o87W7WkGAdLVVz_4rW1VBBlo2YneQ9M8OALKSP1gswDfDNVFE2lX8TK0mwUVTQ=s2560',
  },
  {
    question: 'You find a treasure chest. Do you open it or leave it?',
    options: ['Open it', 'Leave it'],
    correctAnswer: 'Open it',
    image: 'https://lh3.googleusercontent.com/drive-viewer/AITFw-xvoDbYkYhljf4BCSye_KySVipZ_cU6BvQwAHRlfwbvFOL5oEEkmEl9eG0_Gch2HXR8JHnbxXufK-3MJ-Z8ZCHQwy8HKA=s2560',
  },
  {
    question: 'You are in a dark cave. Do you use a torch or proceed in darkness?',
    options: ['Use a torch', 'Proceed in darkness'],
    correctAnswer: 'Use a torch',
    image: 'https://lh3.googleusercontent.com/drive-viewer/AITFw-wKozzyNEwyDXOWJtU8Ah9QZTwhHmb6fCYd_Du9QcfJRvNPBLd5HIJDaOIPNrJfhaQ_UlMBLVgu57j1fva5t9anhGYy=s2560',
  },
  {
    question: 'You encounter a talking frog. Do you kiss it or ignore it?',
    options: ['Kiss it', 'Ignore it'],
    correctAnswer: 'Kiss it',
    image: 'https://lh3.googleusercontent.com/drive-viewer/AITFw-xO7RTM4UWYgWbTKEOPkb2xUuaKkczZdWavo5cMV1pOzMFqWG_1-tdCE57oyDwrVxtuTR81wgvIQ2BRQMkg0tzWBzkm=s2560',
  },
  {
    question: 'You reach a high cliff. Do you climb down or find another path?',
    options: ['Climb down', 'Find another path'],
    correctAnswer: 'Find another path',
    image: 'https://lh3.googleusercontent.com/drive-viewer/AITFw-wyrDiYH5mE0jHytz0I-52ZN2ChFfXo4cnoYRJjWgwBdTGaPsXpQgIjvenVyeTrir04q9VF-qX0UT7mqfcaCXFQ_ji-bA=s2560',
  },
  {
    question: 'You hear a strange noise in the forest. Do you investigate or run away?',
    options: ['Investigate', 'Run away'],
    correctAnswer: 'Investigate',
    image: 'https://lh3.googleusercontent.com/drive-viewer/AITFw-wL1MVLLXQCCqK18NGoa3vfB7otVMOje7WI3eqyR3AkEwGvCh4s18cOQQHhXplhQUCVqMNmEpOYZcQakGi3CKHo38Zlsg=s2560',
  },
  {
    question: 'You encounter a friendly squirrel. Do you trust it or be cautious?',
    options: ['Trust it', 'Be cautious'],
    correctAnswer: 'Be cautious',
    image: 'https://lh3.googleusercontent.com/drive-viewer/AITFw-w6yGvixt7kt72LxN7XJJNEXi4XNbpmy-nxPlxuCdYFwbno21661rguYrNa-dY4UTtcgRHlX2iU0pyVfynIKbGVwoiD0Q=s2560',
  },
  // Add more questions here
];

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
  const [narrationAudio] = useState(new Audio('https://drive.google.com/uc?export=download&id=1pTjInfyrr3cHzOS0k6aHLuLhL52r7vDO')); // Replace with your narration audio URL

  const playNarration = () => {
    narrationAudio.play();
  };

  useEffect(() => {
    // Play narration audio when the component mounts
    playNarration();
  }, []);

  return (
    <div>
      <Image
        src="https://lh3.googleusercontent.com/drive-viewer/AITFw-xTE0nqPJgOYUXi5qxvmzK8udB5zIUhmodgYx4kcYCxVG07rJ8ZpPNORoGWnJdWoe6MwCJAKQXpiCiW1EQOjXWI_M8P=s2560"
        alt="Princess"
        width="200px"
        height="200px"
      />
      <Image
        src="https://lh3.googleusercontent.com/drive-viewer/AITFw-yWfuHtjbRwkzeMtJhdSwqV9RqIbrKMaQeT-98WFeZ6SwnBu3jjSsQBPy70ZiTaSuPNhEY5g_B-YAHa5rkFDrmsL3viUA=s2560"
        alt="Dragon"
        width="200px"
        height="200px"
      />
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

function Questions({ onAnswer, question, options, image }) {
  return (
    <div>
      <Text as="h2" color="green" fontWeight="bold">
        {question}
      </Text>
      <Image src={image} alt={question} width="200px" height="200px" />
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

function ProgressSlider({ progress }) {
  return (
    <Box mt="4">
      <Slider value={progress} max={questions.length - 1} min={0} step={1}>
        <SliderTrack>
          <SliderFilledTrack bg="teal" />
        </SliderTrack>
        <SliderThumb boxSize={6} bg="teal" />
      </Slider>
      <Text mt="2">Progress: {progress + 1} / {questions.length}</Text>
    </Box>
  );
}

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [progress, setProgress] = useState(0);
  const { colorMode } = useColorMode();

  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleGameStart = () => {
    setIsGameStarted(true);
    setQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setProgress(0);
    playBackgroundMusic(); // Start playing background music when the game starts
  };

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[questionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setProgress(progress + 1);
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
    setProgress(0);
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
                <Text as="h2" color="red" fontWeight="bold">
                  Game Over!
                </Text>
                <Text as="p" color="blue" fontWeight="bold">
                  Your Score: {score} / {questions.length}
                </Text>
                <Button onClick={restartGame} colorScheme="teal">
                  Restart Game
                </Button>
              </div>
            ) : (
              <div>
                <Questions
                  onAnswer={handleAnswer}
                  question={questions[questionIndex].question}
                  options={questions[questionIndex].options}
                  image={questions[questionIndex].image}
                />
                <ProgressSlider progress={progress} />
              </div>
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
