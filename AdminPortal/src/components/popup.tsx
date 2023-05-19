import React, { useState } from 'react';
import styles from '@/styles/popup.module.css';

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
        <div className={styles.container}>
          <div className={styles.close_button}><button onClick={onClose} className={styles.close_button}>X</button></div>
          <div className={styles.inner_div}><h2 className={styles.header}>{name}</h2></div>
          <div className={styles.inner_div}>{description}</div>
          <div><button onClick={onClose} className={styles.okay_button}>Okay</button></div>
        </div>
      </div>
    </div>
    );
  };
  
