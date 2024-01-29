'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/register');
  }, []);

  return null; // Since we're redirecting, we don't need to render anything
};

export default IndexPage;
