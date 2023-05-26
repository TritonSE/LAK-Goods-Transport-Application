/**
 * Renders the {url}/admin page.
 */

import styles from '@/styles/Admin.module.css';
import { Sidebar } from '../../components/sidebar';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


interface AdminUser {
  id: number;
  name: string;
  phone: string;
  role: string;
}

export default function Admin() {
  const router = useRouter();
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
  
  function handleRowClick(item: AdminUser) {
    router.push({
      pathname: '/admin/delete',
      query: { id: item.id, name: item.name, phone: item.phone, role: item.role }
    });
  }

  return (
    <>
      <main className={styles.main}>
        <Sidebar currentPage={'/admin'} />
        <div className={styles.header}>{'Manage Admin'}</div>
        <div className={styles.rightalign}>
          <Link href="/admin/add">
            <button className={styles.button}>{'Add Admin'}</button>
          </Link>
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
                  <tr key={JSON.stringify(item)} onClick={() => handleRowClick(item)}>
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
