import React, { useState } from 'react';
import styles from '@/styles/Sidebar.module.css';

type PopupProps = {
    name: string;
    description: string;
    buttonText: string;
    onClose: () => void;
  };
  
export function Popup({ name, description, buttonText, onClose}: PopupProps) {
  
    return (
      <div className={styles.container}>
      <div className={styles.popup}>
        <h2>{name}</h2>
        <p>{description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
    );
  };
  
