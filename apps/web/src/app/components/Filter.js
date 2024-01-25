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
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'center' }}
      >
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            marginBottom={{ base: 2, md: 0 }}
          >
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
