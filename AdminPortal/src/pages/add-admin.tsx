import React from 'react';
import styles from '@/styles/add-admin.module.css';
import { Sidebar } from '../components/sidebar';
import Link from 'next/link';

function AddAdminPage() {
  return (
    <>
    <main className={styles.main}>
        <Sidebar currentPage={'/add-admin'} />
        <div>
          <Link href="/admin">
              <button className={styles.button}>{'Back'}</button>
          </Link>
        </div>
        <div className={styles.header}>{'Add Admin'}</div>
        <div>
          <div className={styles.title}>{'Name'}</div>
          <input className={styles.input} type="text"/>
        </div>
        <div>
          <div className={styles.title}>{'Mobile number'}</div>
          <input className={styles.input} type="text"/>
        </div>
        <Link href="/add-admin">
            <button className={styles.button2}>{'Add'}</button>
        </Link>
      </main>
    </>


    // <div className={styles.container}>
    //   <h1 className={styles.title}>Add Admin</h1>
    //   <p className={styles.description}>This is the page to add an admin.</p>
    // </div>
  );
}

export default AddAdminPage;
