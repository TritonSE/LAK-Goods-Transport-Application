/**
 * Renders the {url}/settings page.
 */

import styles from '@/styles/Home.module.css';
import { Sidebar } from '../components/sidebar';

export default function Settings() {
  return (
    <>
      <main className={styles.main}>
        <Sidebar currentPage={'/settings'} />
        <div>{'This is the settings page!'}</div>
      </main>
    </>
  );
}
