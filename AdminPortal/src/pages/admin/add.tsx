import React from 'react';
import styles from '@/styles/add-admin.module.css';
import { Sidebar } from '../../components/sidebar';
import Link from 'next/link';
import { Popup } from '@/components/popup';
import { useState } from 'react';

function AddAdminPage() {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddClick = () =>{
    setShowPopup(true);
  }

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  return (
    <>
    <main className={styles.main}>
        <Sidebar currentPage={'/admin/add'} />
        <div>
          <Link href="/admin">
              <button className={styles.button}>{'Back'}</button>
          </Link>
        </div>
        <div className={styles.header}>{'Add Admin'}</div>
        <form>
          <div>
            <div className={styles.title}>{'Name'}</div>
            <input className={styles.input} type="text" required/>
          </div>
          <div>
            <div className={styles.title}>{'Email'}</div>
            <input className={styles.input} type="email" required/>
          </div>
          
          <button className={styles.button2} onClick={handleAddClick}>{'Add'}</button>
        </form>
        {showPopup && <Popup
                name="Admin Added"
                description="Admin will appear in the system once they successfully login."
                buttonText="Okay"
                twoButtonStyle={false}
                onClose={handlePopupClose}
              />
        }
      </main>
    </>
  );
}

export default AddAdminPage;
