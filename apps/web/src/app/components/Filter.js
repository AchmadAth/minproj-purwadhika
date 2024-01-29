import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const DropdownFiltering = () => {
  const [selectedOption, setSelectedOption] = useState('All');
  const [options, setOptions] = useState(['All', 'Free']);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Fetch options from backend when component mounts
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await axios.get('/api/options'); // Modify the endpoint as per your backend API
      setOptions(['All', 'Free', ...response.data]); // Assuming response.data is an array of options
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const resetSelectedOption = () => {
    setSelectedOption('All');
  };

  const handleOptionClick = async (option) => {
    setSelectedOption(option);
    onClose();
    if (option === 'Free') {
      try {
        const response = await axios.get('/api/events', {
          params: {
            filterBy: 'priceType',
            filterValue: 'null',
          },
        });
        console.log('Filtered events:', response.data);
        // Handle displaying filtered events in your UI
      } catch (error) {
        console.error('Error fetching filtered events:', error);
      }
    }
  };

  return (
    <>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'center' }}
      >
        <Menu isOpen={isOpen} onClose={onClose}>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            marginBottom={{ base: 2, md: 0 }}
            onClick={onOpen}
          >
            {selectedOption}
          </MenuButton>
          <MenuList>
            {options.map((option) => (
              <MenuItem key={option} onClick={() => handleOptionClick(option)}>
                {option}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Box marginLeft={{ md: 4 }}>
          {selectedOption !== 'All' && `Selected option: ${selectedOption}`}
        </Box>
        <IconButton
          icon="small-close"
          onClick={resetSelectedOption}
          variant="outline"
          isRound
          marginLeft={{ base: 0, md: 2 }}
          marginTop={{ base: 2, md: 0 }}
        />
      </Flex>
    </>
  );
};

export default DropdownFiltering;
