import React from 'react';
import styles from '@/styles/Sidebar.module.css';
import Image from 'next/image';

interface SidebarProps {
  currentPage: String;
}

export function Sidebar({ currentPage }: SidebarProps) {
  return (
    <>
      <div className={styles.sidebar}>
        <div>
          <button type="button" className={styles.sidebarLogo}>
            <a href="./dashboard" className={styles.sidebarLogoText}>
              <Image
                src={'/Logo.svg'}
                width={50}
                height={50}
                className={styles.sidebarLogo}
                alt="LAKTAA Logo"
              />
              Laktaa
            </a>
          </button>
          <div className={styles.menu}>
            <button type="button" className={styles.sidebarButton}>
              <a
                href="./dashboard"
                className={
                  currentPage === '/dashboard'
                    ? styles.active
                    : styles.buttonText
                }
              >
                Driver Registration
              </a>
            </button>
            <button type="button" className={styles.sidebarButton}>
              <a
                href="./profile"
                className={
                  currentPage === '/profile' ? styles.active : styles.buttonText
                }
              >
                Profile
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
