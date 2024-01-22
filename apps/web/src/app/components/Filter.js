import React, { useState } from 'react';
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
  const options = ['All', 'Option 1', 'Option 2', 'Option 3'];

  const resetSelectedOption = () => {
    setSelectedOption('All');
  };

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {selectedOption}
        </MenuButton>
        <MenuList>
          {options.map((option) => (
            <MenuItem key={option} onClick={() => setSelectedOption(option)}>
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Flex justifyContent="space-between">
        <Box>
          {selectedOption !== 'All' && `Selected option: ${selectedOption}`}
        </Box>
        <IconButton
          icon="small-close"
          onClick={resetSelectedOption}
          variant="outline"
          isRound
        />
      </Flex>
    </>
  );
};

export default DropdownFiltering;
