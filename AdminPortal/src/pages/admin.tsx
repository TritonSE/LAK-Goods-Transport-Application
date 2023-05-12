/**
 * Renders the {url}/admin page.
 */

import styles from '@/styles/Admin.module.css';
import { Sidebar } from '../components/sidebar';
import Image from 'next/image';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface AdminUser {
  id: number;
  name: string;
  phone: string;
  role: string;
}

export default function Admin() {
  const auth = useContext(AuthContext);

  let data = [
    {
      id: 1,
      name: 'Thinley Choden',
      phone: '+1 (234) 567-8910',
      role: 'Primary Admin',
    },
    {
      id: 2,
      name: 'Carly Shay',
      phone: '+1 (234) 567-8910',
      role: 'Secondary Admin',
    },
    {
      id: 3,
      name: 'Spencer Shay',
      phone: '+1 (234) 567-8910',
      role: 'Secondary Admin',
    },
    {
      id: 4,
      name: 'Freddie Benson',
      phone: '+1 (234) 567-8910',
      role: 'Secondary Admin',
    },
  ];
  return (
    <>
      <main className={styles.main}>
        <Sidebar currentPage={'/admin'} />
        <div className={styles.header}>{'Manage Admin'}</div>
        <div className={styles.rightalign}>
          <button className={styles.button}>{'Add Admin'}</button>
          <Image src={'/sort.svg'} alt="Sort" width={39} height={30} priority />
        </div>
        <div>
          <table className={styles.table} id="adminTable">
            <thead className={styles.tableheader}>
              <tr>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody className={styles.tablebody}>
              {data.map((item) => (
                <tr key={JSON.stringify(item)}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
