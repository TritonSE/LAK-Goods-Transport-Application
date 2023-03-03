import React, { useState, useEffect } from 'react';
import styles from "@/styles/Dashboard.module.css";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from '../data/data.json'
import { Lato } from '@next/font/google';
import { Sidebar } from '@/components/sidebar';
import Select, {InputActionMeta} from 'react-select';

interface DataItem {
  id: number;
  dateApplied: string;
  name: string;
  mobileNumber: string;
  licenseID: string;
  licensePlate: string;
  isChecked: boolean;
  category: String;
}


interface Option {
  label: string;
  value: string;
}

interface ControlStyles {
  [key: string]: unknown;
}

export default function App() {

  const [activeTab, setActiveTab] = useState<string>('Needs Review');

  const [selectAllClicked, setSelectAllClicked] = useState(new Array(4).fill(false));
  
  // for the dropdown
  const [selected, setSelected] = useState<Option | null>(null);

  
  // mapping the tabs to an integer key
  const tabMapping = new Map();
  tabMapping.set("Needs Review", 1);
  tabMapping.set("In Review", 2);
  tabMapping.set("Verified", 3);
  tabMapping.set("Disapproved", 4);
  
  const [items, setItems] = useState<DataItem[]>([
    {
      "id": 1,
      "dateApplied": "2022-01-01",
      "name": "Hello 1",
      "mobileNumber": "+1 123 456 7890",
      "licenseID": "A1234567",
      "licensePlate": "ABC-123",
      "isChecked": false,
      "category": "Needs Review"
    },
    {
      "id": 2,
      "dateApplied": "2022-02-01",
      "name": "Hello 2",
      "mobileNumber": "+1 987 654 3210",
      "licenseID": "B2345678",
      "licensePlate": "DEF-456",
      "isChecked": false,
      "category": "In Review"
    },
    {
      "id": 3,
      "dateApplied": "2022-03-01",
      "name": "Hello 3",
      "mobileNumber": "+1 111 222 3333",
      "licenseID": "C3456789",
      "licensePlate": "GHI-789",
      "isChecked": false,
      "category": "Verified"
    },
    {
      "id": 4,
      "dateApplied": "2022-01-01",
      "name": "Hello 4",
      "mobileNumber": "+1 123 456 7890",
      "licenseID": "A1234567",
      "licensePlate": "ABC-123",
      "isChecked": false,
      "category": "Needs Review"
    },
    {
      "id": 5,
      "dateApplied": "2022-02-01",
      "name": "Hello 5",
      "mobileNumber": "+1 987 654 3210",
      "licenseID": "B2345678",
      "licensePlate": "DEF-456",
      "isChecked": false,
      "category": "Disapproved"
    }
]);

  const options = [
    { value: 'Needs Review', label: 'Needs Review' },
    { value: 'In Review', label: 'In Review' },
    { value: 'Verified', label: 'Verified' },
    { value: 'Disapproved', label: 'Disapproved' }
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

  const handleDropdownClick = (selectedOption: Option) => {
    setSelected(selectedOption);
    
    setItems(items.map(item => (item.isChecked === true) ? { ...item, isChecked:false,category: selectedOption.label} : item));
  
    setSelectAllClicked(new Array(4).fill(false));
};

  const handleSelectAll = (): void => {
    setSelectAllClicked((prevState: Array<boolean>) => {
      let indexToFlip = tabMapping.get(activeTab);
      
      // convering to 0 based indexing
      indexToFlip = indexToFlip - 1;

      console.log(indexToFlip);

      let newState: boolean[] = [];
    
      for(let i = 0; i < 4; i++){
        if (i === indexToFlip){
          newState.push(!prevState[i]);
        }
        else{
          newState.push(prevState[i]);
        }
      }

      console.log(newState);
      return newState;
    });
  };

  useEffect(() => {
    setItems(items.map(item => (item.category === activeTab) ? { ...item, isChecked: selectAllClicked[tabMapping.get(activeTab) - 1]} : item));
  }, [selectAllClicked]);
  

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
          className={activeTab !== 'Needs Review' ? styles.tabsButton : styles.tabsButtonSelected}
          onClick={() => handleTabClick('Needs Review')}
        >
          Needs Review
        </button>
        <button
          className={activeTab !== 'In Review' ? styles.tabsButton : styles.tabsButtonSelected}
          onClick={() => handleTabClick('In Review')}
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
          onChange={handleDropdownClick}
          styles={customStyle}
          placeholder="Change Status To"
          blurInputOnSelect={true} 
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
              checked={selectAllClicked[tabMapping.get(activeTab) - 1]}
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
          {items.filter(item => item.category == activeTab).map(item => (
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