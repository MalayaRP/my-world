import { Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/react'

export default function SlideEx() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
        <Button onClick={onToggle}>Click Me</Button>
        <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
          <Box
            p='40px'
            color='white'
            mt='4'
            bg='teal.500'
            rounded='md'
            shadow='md'
          >
            <Lorem count={2} />
          </Box>
        </Slide>
      </>
    )
  }