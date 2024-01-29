'use client';

import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';

import NavBar from './Navbar';
import Footer from './Footer';

// pages/dashboard.js
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { checkRole } from '../utils/auth';


function StatsCard(props) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
    >
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

export default function Dashboard() {
  // const router = useRouter();
  // useEffect(() => {
  //   // Check user role when component mounts
  //   const userRole = checkRole(); // Example function to get user role
  //   if (userRole !== 'ORGANIZER') {
  //     router.push('/home'); // Redirect if user doesn't have required role
  //   }
  // }, []);

  return (
    <>
      <NavBar />
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}
        >
          Your Event Overview
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard title={'Your on going event'} stat={'5 events'} />
          <StatsCard title={'Finished Event'} stat={'30 Events'} />
          <StatsCard title={'Total Ticket Sold'} stat={'10000 Tickets!'} />
          <StatsCard title={'Your on going event'} stat={'5 events'} />
          <StatsCard title={'Finished Event'} stat={'30 Events'} />
          <StatsCard title={'Total Ticket Sold'} stat={'10000 Tickets!'} />
          <StatsCard title={'Your on going event'} stat={'5 events'} />
          <StatsCard title={'Finished Event'} stat={'30 Events'} />
          <StatsCard title={'Total Ticket Sold'} stat={'10000 Tickets!'} />
        </SimpleGrid>
      </Box>
      <Footer />
    </>
  );
}
