// components/LogoutButton.js
import { useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Token Removed');
    router.push('/login');
  };

  return (
    <>
      <Button onClick={handleLogout}>Logout</Button>;
    </>
  );
};

export default LogoutButton;
