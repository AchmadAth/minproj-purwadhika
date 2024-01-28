'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { Alert, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter(); // Add this line to get the router object
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER',
    referralCode: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/auth/regis',
        formData,
      );
      setIsSuccess(true);
      console.log('Registration successful:', response.data);
      router.push('/login'); // Replace '/success-page' with your desired route
    } catch (error) {
      console.error('Registration failed:', error.message);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          {isSuccess && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              <AlertTitle mr={2}>Registration successful!</AlertTitle>
              <CloseButton
                onClick={() => setIsSuccess(false)}
                position="absolute"
                right="8px"
                top="8px"
              />
            </Alert>
          )}
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" id="username" onChange={handleChange} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" id="email" onChange={handleChange} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type="password" id="password" onChange={handleChange} />
              </InputGroup>
            </FormControl>
            <FormControl id="referralCode">
              {' '}
              {/* Updated FormControl for referral code */}
              <FormLabel>Referral Code</FormLabel>
              <Input type="text" id="referralCode" onChange={handleChange} />
            </FormControl>
            <FormControl id="role" isRequired>
              <FormLabel>Role</FormLabel>
              <Select id="role" value={formData.role} onChange={handleChange}>
                <option value="USER">User</option>
                <option value="ORGANIZER">Organizer</option>
              </Select>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link href="/login" color={'blue.400'}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
