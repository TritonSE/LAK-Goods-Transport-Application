import { Sidebar } from '../components/sidebar';
import { useContext, useEffect } from 'react';
import { AuthContext, authCookieSet } from '../context/AuthContext';
import { useRouter } from 'next/router';
import styles from '@/styles/Profile.module.css';

export default function Profile() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!authCookieSet()) {
      router.push('/login');
    }
  });

  const signOut = async (e: any) => {
    e.preventDefault();
    auth.logout();
  };

  return (
    <main className={styles.main}>
      <Sidebar currentPage={'/profile'} />
      <div className={styles.container}>
        <img src={'./profile.svg'} className={styles.profileIcon} />
        <div>
          <div className={styles.emailHeader}>Currently signed in as</div>
          <div className={styles.email}>{auth.user?.email}</div>
          <button type="button" onClick={signOut} className={styles.signOut}>
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
