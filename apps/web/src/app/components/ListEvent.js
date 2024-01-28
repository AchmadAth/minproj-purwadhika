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
  Image, // Import Image component from Chakra UI
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { debounce } from 'lodash';
import SortingComponent from './Sorting';
import DropdownFiltering from './Filter';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const formatPrice = (priceIDR) => {
    if (priceIDR === null) {
      return 'Free';
    } else {
      // Format the priceIDR if it's not null
      return rupiah(priceIDR);
    }
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };
  // Create a debounced version of the handleSearch function
  const debouncedHandleSearch = debounce(async () => {
    try {
      const url = searchQuery
        ? `http://localhost:8000/events/search/?search=${searchQuery}&page=${currentPage}`
        : `http://localhost:8000/events/?page=${currentPage}`;

      const response = await axios.get(url);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, 500); // Adjust the debounce delay as needed

  useEffect(() => {
    // Call the debounced function when searchQuery or currentPage changes
    debouncedHandleSearch();
    // Cancel the debounce on component unmount
    return () => debouncedHandleSearch.cancel();
  }, [searchQuery, currentPage]);

  const handleSearch = () => {
    // You can leave this function empty or add any additional logic if needed
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box p={4}>
      <Box textAlign={'center'}>
        <Heading mb={4} justifyContent={'center'}>
          Event List
        </Heading>
      </Box>

      <HStack
        mb={4}
        p={4}
        spacing={32}
        alignItems={'center'}
        justify={'center'}
      >
        <DropdownFiltering />

        {/* SEARCH */}
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

      {/* CARD */}
      <Flex flexWrap="wrap" justifyContent="space-between">
        {events.map((event) => (
          <Card
            key={event.id}
            maxW="sm"
            borderWidth="1px"
            p={4}
            mb={4}
            position="relative"
          >
            <Box display="flex" flexDirection="column" height="100%">
              <Box flex="1">
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
                  <Text as={'b'}>Date:</Text> {event.date}
                </Text>
                <Text fontSize="md" mb={2}>
                  <Text as={'b'}>Time:</Text> {event.time} WIB
                </Text>
                <Text fontSize="md" mb={2}>
                  <Text as={'b'}>Duration:</Text> {event.duration} min
                </Text>
                <Text fontSize="md" mb={2}>
                  <Text as={'b'}>Seats:</Text> {event.seats}
                </Text>
                <Text fontSize="md" mb={2}>
                  <Text as={'b'}>Price:</Text> {formatPrice(event.priceIDR)}
                </Text>
                {/* Display image from public/cover folder */}
                <Image
                  src={`../../../public/cover/${event.image}`}
                  alt="Event Cover"
                />
              </Box>
              <Box mt="auto">
                <Button>Buy Now</Button>
              </Box>
            </Box>
          </Card>
        ))}
      </Flex>

      {/* Pagination */}
      <Box textAlign="center" mt={4}>
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          mr={2}
        >
          Previous
        </Button>
        <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
      </Box>
    </Box>
  );
};

export default EventList;
