import { authCookieSet } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!authCookieSet) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }, [router]);
}
