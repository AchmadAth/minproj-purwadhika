import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  ModalFooter,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { debounce } from 'lodash';
import NavBar from './Navbar';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [originalEvents, setOriginalEvents] = useState([]); // Track original events
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const formatPrice = (priceIDR) => {
    if (priceIDR === null) {
      return 'Free';
    } else {
      return rupiah(priceIDR);
    }
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  const fetchEventData = async (search = '') => {
    try {
      const url = search
        ? `http://localhost:8000/events/search/?search=${search}&page=${currentPage}`
        : `http://localhost:8000/events/?page=${currentPage}`;

      const response = await axios.get(url);
      setEvents(response.data);
      setOriginalEvents(response.data); // Update original events
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Debounce search
  const debouncedHandleSearch = debounce(fetchEventData, 500);

  useEffect(() => {
    fetchEventData();
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [searchQuery, currentPage]);

  const handleSearch = () => {
    debouncedHandleSearch(searchQuery);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterFreeEvents = () => {
    const freeEvents = originalEvents.filter(
      (event) => event.priceIDR === null,
    ); // Filter from original events
    setEvents(freeEvents);
  };

  const handleShowAllEvents = async () => {
    await fetchEventData();
  };

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <Box p={4}>
        <Box textAlign="center">
          <Heading mb={4}>Event List</Heading>
        </Box>

        <Box
          mb={4}
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button onClick={handleFilterFreeEvents} mr={4}>
            Free Events
          </Button>
          <Button onClick={handleShowAllEvents}>All</Button>
          <Box ml="auto">
            <Box display="flex">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button ml={2} leftIcon={<SearchIcon />} onClick={handleSearch}>
                Search
              </Button>
            </Box>
          </Box>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {events.map((event) => (
            <Box
              key={event.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Box p={6}>
                <Heading size="md" mb={2}>
                  {event.title}
                </Heading>
                <Text fontSize="md" mb={2}>
                  <b>Speaker: </b> {event.speaker}
                </Text>
                <Text fontSize="md" mb={2}>
                  <b>Date: </b> {event.date}
                </Text>
                <Text fontSize="md" mb={2}>
                  <b>Price: </b> {formatPrice(event.priceIDR)}
                </Text>
                <Image
                  src={`../../../cover/${event.image}`}
                  alt="Event Cover"
                />
                <Button mt={4} onClick={() => handleCardClick(event)}>
                  View Details
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        <Box textAlign="center" mt={4}>
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            mr={2}
          >
            Previous
          </Button>
          <Button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </Button>
        </Box>

        {/* Modal for displaying full event details */}
        <Modal
          isOpen={selectedEvent !== null}
          onClose={handleCloseModal}
          size={'xl'}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <b>{selectedEvent?.title}</b>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                <b>Speaker: </b> {selectedEvent?.speaker}
              </Text>
              <Text>
                <b>Date: </b> {selectedEvent?.date}
              </Text>
              <Text>
                <b>Time: </b> {selectedEvent?.time} WIB
              </Text>
              <Text>
                <b>Duration: </b> {selectedEvent?.duration} min
              </Text>
              <Text>
                <b>Seats: </b> {selectedEvent?.seats}
              </Text>
              <Text>
                <b>Price: </b> {formatPrice(selectedEvent?.priceIDR)}
              </Text>
              <Text>
                <b>Description: </b> {selectedEvent?.description}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button>Buy Now</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default EventList;
