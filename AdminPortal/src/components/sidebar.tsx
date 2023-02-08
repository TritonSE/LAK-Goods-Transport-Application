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
            <a href="./admin" className={styles.sidebarLogoText}>
              <Image
                src={'/Logo.svg'}
                width={50}
                height={50}
                className={styles.sidebarLogo}
                alt="LAKTAA Logo"
              />
              Laakta
            </a>
          </button>
          <div className={styles.menu}>
            <button type="button" className={styles.sidebarButton}>
              <a
                href="./admin"
                className={
                  currentPage === '/admin' ? styles.active : styles.buttonText
                }
              >
                Driver Registration
              </a>
            </button>

            <button type="button" className={styles.sidebarButton}>
              <a
                href="./ratings"
                className={
                  currentPage === '/ratings' ? styles.active : styles.buttonText
                }
              >
                Ratings
              </a>
            </button>

            <button type="button" className={styles.sidebarButton}>
              <a
                href="./settings"
                className={
                  currentPage === '/settings'
                    ? styles.active
                    : styles.buttonText
                }
              >
                Manage Admin
              </a>
            </button>
          </div>
        </div>
        <a href="./profile" className={styles.sidebarProfile}>
          <Image
            src={'/Profile.svg'}
            width={31}
            height={31}
            className={styles.sidebarProfile}
            alt="Profile Icon"
          />
        </a>
      </div>
    </>
  );
}
