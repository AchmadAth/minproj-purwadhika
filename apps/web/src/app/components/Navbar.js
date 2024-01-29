'use client';
import { setAuthToken } from '../utils/auth';
import axios from 'axios';

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { React, createElement, useState, useEffect } from 'react';
import LogoutButton from './LogoutButton';

// cek apakah ada local storage atau tidak. cek di use effect

const Links = [
  { name: 'Home', href: '/home' },
  { name: 'Dashboard', href: '/dashboard' },
  'Team',
];

const NavLink = (props) => {
  const { children } = props;
  return createElement(
    'Box',
    {
      as: 'a',
      px: 2,
      py: 1,
      rounded: 'md',
      _hover: {
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      },
      href: '#',
    },
    children,
  );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({ point: 0 });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Set token in request headers
      setAuthToken(token);
      // Make authenticated request to fetch user data
      axios
        .get('http://localhost:8000/auth/keepLogin')
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch user data:', error);
          // Handle error
        });
    }
  }, []);
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <Link key={link.name} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}
            >
              <Link href="/createEvent">Create Event</Link>
            </Button>
            <Text mr={4}>
              {userData && (
                <Box>
                  <Text>Point: {userData.point}</Text>
                </Box>
              )}
            </Text>
            <Menu>
              <MenuButton
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  {userData && (
                    <Box>
                      <Text>Referal Code: {userData.refcode}</Text>
                    </Box>
                  )}
                </MenuItem>
                <MenuItem>
                  {userData && (
                    <Box>
                      <Text>Email: {userData.email}</Text>
                    </Box>
                  )}
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  <LogoutButton />
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <Link key={link.name} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
