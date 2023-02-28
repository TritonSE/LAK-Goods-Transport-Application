import React, { useState, useEffect } from 'react';
import styles from "@/styles/Dashboard.module.css";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from '../data/data.json'
import { Lato } from '@next/font/google';
import Select from 'react-select'
import { Sidebar } from '@/components/sidebar';

interface DataItem {
  id: number;
  dateApplied: string;
  name: string;
  mobileNumber: string;
  licenseID: string;
  licensePlate: string;
  isChecked: boolean
}

interface ControlStyles {
  [key: string]: unknown;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('Needs_Review');
  const [isChecked, setIsChecked] = useState(false);
  const [items, setItems] = useState<DataItem[]>([
    {
      "id": 1,
      "dateApplied": "2022-01-01",
      "name": "John Doe",
      "mobileNumber": "+1 123 456 7890",
      "licenseID": "A1234567",
      "licensePlate": "ABC-123",
      "isChecked": false
    },
    {
      "id": 2,
      "dateApplied": "2022-02-01",
      "name": "Jane Doe",
      "mobileNumber": "+1 987 654 3210",
      "licenseID": "B2345678",
      "licensePlate": "DEF-456",
      "isChecked": false
    },
    {
      "id": 3,
      "dateApplied": "2022-03-01",
      "name": "Jim Smith",
      "mobileNumber": "+1 111 222 3333",
      "licenseID": "C3456789",
      "licensePlate": "GHI-789",
      "isChecked": false
    },
    {
      "id": 4,
      "dateApplied": "2022-01-01",
      "name": "John Doe",
      "mobileNumber": "+1 123 456 7890",
      "licenseID": "A1234567",
      "licensePlate": "ABC-123",
      "isChecked": false
    },
    {
      "id": 5,
      "dateApplied": "2022-02-01",
      "name": "Jane Doe",
      "mobileNumber": "+1 987 654 3210",
      "licenseID": "B2345678",
      "licensePlate": "DEF-456",
      "isChecked": false
    }
]);

  const options = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    { value: 'option3', label: 'option3' }
  ]

  const customStyle = {
    control: (styles: ControlStyles) => ({
      ...styles,
      borderColor: '#9e9e9e',
      height: '100%',
      width: '260px',      
    }),
  };
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSelectAll = (): void => {
    setIsChecked(!isChecked);
    setItems(items.map(item => ({ ...item, isChecked: !isChecked })));
  };

  const handleItemCheckbox = (id: number): void => {
    setItems(items.map(item => (item.id === id) ? {...item, isChecked:!item.isChecked} : item));
    
  };

  return (
    <div className={styles.page}>
    <Sidebar currentPage="Dashboard"></Sidebar>
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
        <Select 
          options={options} 
          styles={customStyle}
          placeholder="Change Status To"
        />

        <button className={styles.exportButton}>
          Export to CSV File
        </button>

        </div>

      <table>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeadItem}>
              <input 
              type="checkbox" 
              className={styles.checkbox} 
              checked={isChecked}
              onChange={handleSelectAll}
              >
              </input>
            </th>
            <th className={styles.tableHeadItem}>Date Applied</th>
            <th className={styles.tableHeadItem}>Name</th>
            <th className={styles.tableHeadItem}>Mobile Number</th>
            <th className={styles.tableHeadItem}>License ID</th>
            <th className={styles.tableHeadItem}>License Plate #</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {items.map(item => (
            <tr key={item.id}>
              <td className={styles.tableData}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox} 
                  checked={item.isChecked}
                  onChange={() => handleItemCheckbox(item.id)}>
                </input>
              </td>
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
    </div>
      
  )
}