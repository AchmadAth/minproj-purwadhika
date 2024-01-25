import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Flex,
  Text,
  Card,
  Input,
  Button,
  HStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { debounce } from 'lodash';
import SortingComponent from './Sorting';
import DropdownFiltering from './Filter';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Create a debounced version of the handleSearch function
  const debouncedHandleSearch = debounce(async () => {
    try {
      const url = searchQuery
        ? `http://localhost:8000/events/search/?search=${searchQuery}`
        : 'http://localhost:8000/events/';

      const response = await axios.get(url);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, 500); // Adjust the debounce delay as needed

  useEffect(() => {
    // Call the debounced function when searchQuery changes
    debouncedHandleSearch();
    // Cancel the debounce on component unmount
    return () => debouncedHandleSearch.cancel();
  }, [searchQuery, debouncedHandleSearch]);

  const handleSearch = () => {
    // You can leave this function empty or add any additional logic if needed
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Event List</Heading>
      <HStack
        mb={4}
        p={4}
        spacing={32}
        alignItems={'center'}
        justify={'center'}
      >
        <DropdownFiltering />
        <Flex>
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch} ml={2} leftIcon={<SearchIcon />}>
            Search
          </Button>
        </Flex>
      </HStack>
      <Flex flexWrap="wrap" justifyContent="space-between">
        {events.map((event) => (
          <Card key={event.id} maxW="sm" borderWidth="1px" p={4} mb={4}>
            <Heading fontSize="xl" mb={2}>
              {event.title}
            </Heading>
            <Text fontSize="md" mb={2}>
              <Text as={'b'}>Speaker: </Text> {event.speaker}
            </Text>
            <Text fontSize="md" mb={2}>
              <Text as={'b'}>Description:</Text> {event.description}
            </Text>
            <Text fontSize="md" mb={2}>
              <Text as={'b'}>Date:</Text>
              {event.date}
            </Text>
            <Text fontSize="md" mb={2}>
              <Text as={'b'}>Time:</Text> {event.time}
            </Text>
            <Text fontSize="md" mb={2}>
              <Text as={'b'}>Duration:</Text> {event.duration} min
            </Text>
            <Text fontSize="md" mb={2}>
              <Text as={'b'}> Price:</Text> {event.price}
            </Text>
            {/* Add any additional information you want to display on the card */}
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default EventList;
