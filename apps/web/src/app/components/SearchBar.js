import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ onSearch }) => {
  const handleSearch = () => {
    // Add your search logic here
    console.log('Search button clicked');
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <Box>
      <InputGroup>
        <Input type="text" placeholder="Search..." />
        <InputRightElement>
          <Button onClick={handleSearch} variant="ghost">
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
