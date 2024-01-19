'use client';

import { useEffect, useState } from 'react';
import { SimpleGrid, Box, Text, Image, Flex, Icon } from '@chakra-ui/react';

const HomePage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const jobTitles = [
    'Software Engineer',
    'UX Designer',
    'Data Scientist',
    'Product Manager',
    'Marketing Specialist',
    'QA Engineer',
    'Sales Representative',
    'Graphic Designer',
    'Customer Support',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=9');
        const data = await response.json();
        setTeamMembers(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Box px={30} py={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign={'center'}>
          Our Amazing Team
        </Text>
        <Text color="gray.600" mb={8} textAlign={'center'}>
          Meet the talented individuals who make our team exceptional.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {teamMembers.map((member, index) => (
            <Box key={index} overflow="hidden" textAlign="center">
              <Image
                src={member.picture.large}
                alt={member.name.first}
                borderRadius="full"
                boxSize="150px"
                mx="auto"
                my={4}
              />
              <Box>
                <Text fontWeight="bold">{`${member.name.first} ${member.name.last}`}</Text>
                <Text color="gray.500" mb={2}>
                  {jobTitles[index]}
                </Text>
                <Flex align="center" justify="center">
                  <Text>{member.email}</Text>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default HomePage;
