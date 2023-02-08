/**
 * Renders the {url}/profile page.
 */

import styles from '@/styles/Home.module.css';
import { Sidebar } from '../components/sidebar';

export default function Profile() {
  return (
    <>
      <main className={styles.main}>
        {<div>{'This is the profile page!'}</div>}
        <Sidebar currentPage={'/profile'} />
      </main>
    </>
  );
}
