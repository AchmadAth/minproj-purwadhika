'use client';

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(null);
  const router = useRouter(); // Add this line to get the router object
  // check token dulu.
  // siapkan global state menyimpan data dalam redux.
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/auth/login',
        formData,
      );
      // Handle successful login here (e.g., store user token in the state or localStorage)
      console.log('Login successful:', response.data);
      setLoginError(null); // Reset error state on success

      // Show success message
      // You can redirect or perform any other action upon successful login
      // Store token in local storage upon successful login
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      alert('Login success');
      router.push('/home');
      // Menyimpan token kedalam local storage
    } catch (error) {
      // Handle login error (e.g., show an error message)
      console.error('Login failed:', error.message);
      setLoginError('Invalid username or email'); // Set error message state
    }
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          {loginError && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {loginError}
            </Alert>
          )}
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" id="email" onChange={handleChange} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" id="password" onChange={handleChange} />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            >
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button
              colorScheme={'blue'}
              variant={'solid'}
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </Stack>
          <Stack>
            <Button colorScheme={'red'} variant={'solid'}>
              <Link href="/register">Register</Link>
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}
