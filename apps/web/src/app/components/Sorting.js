import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

const SortingComponent = ({ onSortChange }) => {
  const handleSort = (order) => {
    // Here, you can perform your sorting logic or update state
    console.log(`Sorting in ${order} order`);

    // Call the provided callback with the sorting order
    if (onSortChange) {
      onSortChange(order);
    }
  };

  return (
    <Box>
      <ButtonGroup variant="outline" spacing="2">
        <Button leftIcon={<ChevronUpIcon />} onClick={() => handleSort('asc')}>
          Asc
        </Button>
        <Button
          leftIcon={<ChevronDownIcon />}
          onClick={() => handleSort('desc')}
        >
          Desc
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default SortingComponent;
