/**
 * Renders the {url}/admin page.
 */

import styles from '@/styles/Home.module.css';
import { Sidebar } from '../components/sidebar';

export default function Admin() {
  return (
    <>
      <main className={styles.main}>
        <Sidebar currentPage={'/admin'} />
        <div>{'This is the admin page!'}</div>
      </main>
    </>
  );
}
