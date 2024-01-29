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
  Select, // Import Select component from Chakra UI
  Modal, // Import Modal component from Chakra UI
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    speaker: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    seats: '',
    priceType: '', // Store price type: "Free" or "Paid"
    priceIDR: null, // Store price in IDR if paid
    gambar: null, // Added for file upload
  });
  const [isPaidModalOpen, setIsPaidModalOpen] = useState(false); // State to control the visibility of the modal
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const eventData = {
        title: formData.title,
        speaker: formData.speaker,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        seats: formData.seats,
        duration: formData.duration,
        priceType: formData.priceType,
        priceIDR: formData.priceIDR,
      };

      const eventResponse = await axios.post(
        'http://localhost:8000/events/',
        eventData,
      );

      const formDataWithFile = new FormData();
      formDataWithFile.append('gambar', formData.gambar);

      const imageResponse = await axios.post(
        'http://localhost:8000/events/upload',
        formDataWithFile,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

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
        time: '',
        duration: '',
        seats: '',
        priceType: '',
        priceIDR: null,
        gambar: null,
      });

      console.log('Backend Response:', eventResponse.data, imageResponse.data);
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

  // Function to handle submission when price is set to "Paid"
  const handlePaidSubmit = () => {
    setIsPaidModalOpen(false); // Close the modal
    handleSubmit(); // Proceed with the form submission
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
            <FormLabel>Time</FormLabel>
            <Input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="-- : --- "
            />
          </FormControl>

          <FormControl>
            <FormLabel>Duration</FormLabel>
            <Input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="enter event duration"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Available Seats</FormLabel>
            <Input
              type="text"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              placeholder="enter available seats"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Select
              name="priceType"
              value={formData.priceType}
              onChange={handleChange}
              placeholder="Select price type"
            >
              <option value="FREE">FREE</option>
              <option value="PAID">PAID</option>
            </Select>
            {formData.priceType === 'PAID' && (
              <Button onClick={() => setIsPaidModalOpen(true)}>
                Input Price
              </Button>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Upload Image</FormLabel>
            <Input
              type="file"
              name="gambar"
              onChange={handleChange}
              accept="image/*" // Restrict to image files
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </Stack>
      </form>
      {/* Modal for inputting price when paid option is selected */}
      <Modal isOpen={isPaidModalOpen} onClose={() => setIsPaidModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Input Price</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePaidSubmit();
              }}
            >
              <FormControl>
                <FormLabel>Price (IDR)</FormLabel>
                <Input
                  type="number"
                  name="priceIDR"
                  value={formData.priceIDR}
                  onChange={handleChange}
                  placeholder="Enter price in IDR"
                />
              </FormControl>
              <Button type="submit">Submit</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EventForm;
