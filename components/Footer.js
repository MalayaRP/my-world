
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
  } from '@chakra-ui/react';
  import { FaLinkedin } from 'react-icons/fa';
  import { ReactNode } from 'react';
  
  const SocialButton = ({
    children,
    label,
    href,
  }) => {
    return (
      <chakra.button
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded={'full'}
        w={8}
        h={8}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };
  
  export default function SmallWithSocial() {
    return (
      <Box>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', xs: 'row' }}
          spacing={4}
          justify={{ base: 'center', xs: 'space-between' }}
          align={{ base: 'center', xs: 'center' }}>
          <Text>© 2023 Malaya Ranjan Patra</Text>
          
            <SocialButton label={'Twitter'} href={'https://www.linkedin.com/in/malaya-ranjan-patra-4855a9184'}>
              <FaLinkedin />
           </SocialButton>
        </Container>
      </Box>
    );
  }