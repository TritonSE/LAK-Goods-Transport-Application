import React, { useState, useEffect } from 'react';
import styles from "@/styles/Dashboard.module.css";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from '../data/data.json'
import { Lato } from '@next/font/google';

interface DataItem {
  id: number;
  dateApplied: string;
  name: string;
  mobileNumber: string;
  licenseID: string;
  licensePlate: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('Needs_Review');
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('../data/data.json');
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    fetchData()
  };

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className={styles.outer}>
      <h1 className={styles.title}>Driver Registration</h1>

      <div className={styles.tabs}>
        <button
          className={activeTab !== 'Needs_Review' ? styles.tabsButton : styles.tabsButtonSelected}
          onClick={() => handleTabClick('Needs_Review')}
        >
          Needs Review
        </button>
        <button
          className={activeTab !== 'In_Review' ? styles.tabsButton : styles.tabsButtonSelected}
          onClick={() => handleTabClick('In_Review')}
        >
          In Review
        </button>
        <button
          className={activeTab !== 'Verified' ? styles.tabsButton : styles.tabsButtonSelected}
          onClick={() => handleTabClick('Verified')}
        >
          Verified
        </button>
        <button
          className={activeTab !== 'Disapproved' ? styles.tabsButton : styles.tabsButtonSelected}
          onClick={() => handleTabClick('Disapproved')}
        >
          Disapproved
        </button>
      </div>

      <hr className={styles.horizontalLine}></hr>

      <div className={styles.dropdownAndExportBar}>
        <Dropdown>
          <Dropdown.Toggle className={styles.dropdown}>
            Change Status To
          </Dropdown.Toggle>

          <Dropdown.Menu className={styles.dropdownItems}>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <button className={styles.exportButton}>
          Export to CSV File
        </button>

        </div>

      <table>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeadItem}>Date Applied</th>
            <th className={styles.tableHeadItem}>Name</th>
            <th className={styles.tableHeadItem}>Mobile Number</th>
            <th className={styles.tableHeadItem}>License ID</th>
            <th className={styles.tableHeadItem}>License Plate #</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data.map(item => (
            <tr key={item.id}>
              <td className={styles.tableData}>{item.dateApplied}</td>
              <td className={styles.tableData}>{item.name}</td>
              <td className={styles.tableData}>{item.mobileNumber}</td>
              <td className={styles.tableData}>{item.licenseID}</td>
              <td className={styles.tableData}>{item.licensePlate}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
      
  )
}