'use client';
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  useToast,
} from '@chakra-ui/react';

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    speaker: '',
    description: '',
    date: '',
    price: '',
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/events/',
        formData,
      );

      //  toast
      toast({
        title: 'Event submitted!',
        description: 'Your event details have been successfully submitted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        title: '',
        speaker: '',
        description: '',
        date: '',
        price: '',
      });

      console.log('Backend Response:', response.data);
    } catch (error) {
      console.error('Error submitting event:', error);
      toast({
        title: 'Error',
        description:
          'An error occurred while submitting the event. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Submit Event Details</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Speaker</FormLabel>
            <Input
              type="text"
              name="speaker"
              value={formData.speaker}
              onChange={handleChange}
              placeholder="Enter speaker name"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description (max 190 chars)"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="dd/mm/yyyy"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Free/ paid"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EventForm;
