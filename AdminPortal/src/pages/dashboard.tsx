import React, { useState, useEffect } from 'react';
import styles from '@/styles/Dashboard.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Sidebar } from '@/components/sidebar';
import Select, { InputActionMeta } from 'react-select';

const data = [
  {
    id: 1,
    dateApplied: '2022-01-01',
    name: 'John Doe',
    emailID: 'johndoe@gmail.com',
    licenseID: 'A1234567',
    licensePlate: 'ABC-123',
    isChecked: false,
  },
  {
    id: 2,
    dateApplied: '2022-02-01',
    name: 'Jane Doe',
    emailID: 'janedoe@gmail.com',
    licenseID: 'B2345678',
    licensePlate: 'DEF-456',
    isChecked: false,
  },
  {
    id: 3,
    dateApplied: '2022-03-01',
    name: 'Jim Smith',
    emailID: 'jimsmith@gmail.com',
    licenseID: 'C3456789',
    licensePlate: 'GHI-789',
    isChecked: false,
  },
  {
    id: 4,
    dateApplied: '2022-01-01',
    name: 'John Doe',
    emailID: 'johndoe@gmail.com',
    licenseID: 'A1234567',
    licensePlate: 'ABC-123',
    isChecked: false,
  },
  {
    id: 5,
    dateApplied: '2022-02-01',
    name: 'Jane Doe',
    emailID: 'janedoe@gmail.com',
    licenseID: 'B2345678',
    licensePlate: 'DEF-456',
    isChecked: false,
  },
];

interface DataItem {
  id: number;
  dateApplied: string;
  name: string;
  emailID: string;
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
  const options = [
    { value: 'Needs Review', label: 'Needs Review' },
    { value: 'In Review', label: 'In Review' },
    { value: 'Verified', label: 'Verified' },
    { value: 'Disapproved', label: 'Disapproved' },
  ];
  const numTabs = options.length;

  const [activeTab, setActiveTab] = useState<string>('Needs Review');

  const [selectAllClicked, setSelectAllClicked]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  // for the dropdown
  const [selected, setSelected] = useState<Option | null>(null);

  // mapping the tabs to an integer key
  const tabMapping = new Map();
  tabMapping.set('Needs Review', 1);
  tabMapping.set('In Review', 2);
  tabMapping.set('Verified', 3);
  tabMapping.set('Disapproved', 4);

  const [items, setItems] = useState<DataItem[]>([
    {
      id: 1,
      dateApplied: '2022-01-01',
      name: 'Hello 1',
      emailID: 'hello1@gmail.com',
      licenseID: 'A1234567',
      licensePlate: 'ABC-123',
      isChecked: false,
      category: 'Needs Review',
    },
    {
      id: 2,
      dateApplied: '2022-02-01',
      name: 'Hello 2',
      emailID: 'hello2@gmail.com',
      licenseID: 'B2345678',
      licensePlate: 'DEF-456',
      isChecked: false,
      category: 'In Review',
    },
    {
      id: 3,
      dateApplied: '2022-03-01',
      name: 'Hello 3',
      emailID: 'hello3@gmail.com',
      licenseID: 'C3456789',
      licensePlate: 'GHI-789',
      isChecked: false,
      category: 'Verified',
    },
    {
      id: 4,
      dateApplied: '2022-01-01',
      name: 'Hello 4',
      emailID: 'hello4@gmail.com',
      licenseID: 'A1234567',
      licensePlate: 'ABC-123',
      isChecked: false,
      category: 'Needs Review',
    },
    {
      id: 5,
      dateApplied: '2022-02-01',
      name: 'Hello 5',
      emailID: 'hello5@gmail.com',
      licenseID: 'B2345678',
      licensePlate: 'DEF-456',
      isChecked: false,
      category: 'Disapproved',
    },
  ]);

  const customStyle = {
    control: (styles: ControlStyles) => ({
      ...styles,
      borderColor: '#9e9e9e',
      height: '100%',
      width: '260px',
    }),
  };

  const handleTabClick = (tab: string) => {
    console.log('Select all clicked is', selectAllClicked);
    setSelectAllClicked(false);
    setActiveTab((prev) => {
      const newItems = items.map((item) =>
        item.category === prev ? { ...item, isChecked: false } : item
      );
      setItems(newItems);
      return tab;
    });
  };

  const handleDropdownClick = (selectedOption: Option) => {
    setSelected(selectedOption);

    setItems(
      items.map((item) =>
        item.isChecked === true
          ? { ...item, isChecked: false, category: selectedOption.label }
          : item
      )
    );

    setSelectAllClicked(false);
  };

  const handleSelectAll = (): void => {
    setSelectAllClicked((prevState: boolean) => {
      return !prevState;
    });
  };

  useEffect(() => {
    setItems(
      items.map((item) =>
        item.category === activeTab
          ? {
              ...item,
              isChecked: selectAllClicked,
            }
          : item
      )
    );
  }, [selectAllClicked, activeTab]);

  const handleItemCheckbox = (id: number): void => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  return (
    <div className={styles.page}>
      <Sidebar currentPage="Dashboard"></Sidebar>
      <div className={styles.outer}>
        <h1 className={styles.title}>Driver Registration</h1>

        <div className={styles.tabs}>
          <button
            className={
              activeTab !== 'Needs Review'
                ? styles.tabsButton
                : styles.tabsButtonSelected
            }
            onClick={() => handleTabClick('Needs Review')}
          >
            Needs Review
          </button>
          <button
            className={
              activeTab !== 'In Review'
                ? styles.tabsButton
                : styles.tabsButtonSelected
            }
            onClick={() => handleTabClick('In Review')}
          >
            In Review
          </button>
          <button
            className={
              activeTab !== 'Verified'
                ? styles.tabsButton
                : styles.tabsButtonSelected
            }
            onClick={() => handleTabClick('Verified')}
          >
            Verified
          </button>
          <button
            className={
              activeTab !== 'Disapproved'
                ? styles.tabsButton
                : styles.tabsButtonSelected
            }
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

          <button className={styles.exportButton}>Export to CSV File</button>
        </div>

        <table>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeadItem}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectAllClicked}
                  onChange={handleSelectAll}
                ></input>
              </th>
              <th className={styles.tableHeadItem}>Date Applied</th>
              <th className={styles.tableHeadItem}>Name</th>
              <th className={styles.tableHeadItem}>Email ID</th>
              <th className={styles.tableHeadItem}>License ID</th>
              <th className={styles.tableHeadItem}>License Plate #</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {items
              .filter((item) => item.category === activeTab)
              .map((item) => (
                <tr key={item.id}>
                  <td className={styles.tableData}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={item.isChecked}
                      onChange={() => handleItemCheckbox(item.id)}
                    ></input>
                  </td>
                  <td className={styles.tableData}>{item.dateApplied}</td>
                  <td className={styles.tableData}>{item.name}</td>
                  <td className={styles.tableData}>{item.emailID}</td>
                  <td className={styles.tableData}>{item.licenseID}</td>
                  <td className={styles.tableData}>{item.licensePlate}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
