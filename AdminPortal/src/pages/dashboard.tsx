import React, { useState, useEffect } from 'react';
import styles from '@/styles/Dashboard.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Sidebar } from '@/components/sidebar';
import Select, { InputActionMeta } from 'react-select';
// import { API_URL } from '@env';

interface DataItem {
  _id: string;
  dateApplied: string;
  firstName: string;
  lastName: string;
  phone: string;
  driverLicenseId: string;
  licensePlate: string;
  isChecked: boolean;
  verificationStatus: String;
}

interface Option {
  label: string;
  value: string;
}

interface ControlStyles {
  [key: string]: unknown;
}

const createFormData = (
  body: { [key: string]: string }
) => {
  const data = new FormData();
  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

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

  const USERS_URL = `http://localhost:3000/api/users`;
  const getAllDrivers = async () => {
    try {
      const url = `${USERS_URL}/get-all-users?`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: '',
      });
      let data = await response.json();
      data = data.users;
      return data;
    } catch {
      return [];
    }
  };

  const getUser = async (id: String) => {
    try {
      const url = `${USERS_URL}/${id}?`;
      const response = await fetch(url);
      let user= await response.json();
      user = user.toObject();
      return user;
    } catch {
      return [];
    }
  };

  const updateUser = async (
    userId: string,
    updatedUser: FormData
  ) => {
    try {
      const url = `${USERS_URL}/${userId}`;
      const response = await fetch(url, {
        method: 'PUT',
        body: updatedUser,
      });
      const data = await response.json();
      //this is currently not printing
      data.then((val) => {
        console.log("HELLO")
        console.log(val)
      })
      return { userId: data.userId };
    } catch {
      return null;
    }
  };

  useEffect(() => {
    let users = getAllDrivers();
    users.then((value) => {
      console.log(value);
      setItems(value);
    });
    
  }, []);

  const [items, setItems] = useState<DataItem[]>([]);
  
  const customStyle = {
    control: (styles: ControlStyles) => ({
      ...styles,
      borderColor: '#9e9e9e',
      height: '100%',
      width: '260px',
    }),
  };

  //Switch to a different tab
  const handleTabClick = (tab: string) => {
    console.log('Select all clicked is', selectAllClicked);
    setSelectAllClicked(false);
    setActiveTab((prev) => {
      const newItems = items.map((item) =>
        item.verificationStatus === prev ? { ...item, isChecked: false } : item
      );
      setItems(newItems);
      return tab;
    });
  };

  const handleDropdownClick = (selectedOption: Option) => {
    setSelected(selectedOption);
    items.map((item) => {
      if(item.isChecked){
        //Get the UserData 
        let userData = getUser(item._id);

        //Modify userData
        userData.then((user) => {
          user.verificationStatus = selectedOption;
          let formUser = createFormData(user);
          updateUser(item._id, formUser);
        });

        // userData.then((user) => {
        //   //Send update to MongoDB
        //   let formUser = createFormData(user);
        //   updateUser(item._id, formUser);
        // });
        
      }
    }
    )

    setItems(
      items.map((item) => 
        item.isChecked === true
          ? { ...item, isChecked: false, verificationStatus: selectedOption.label }
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
        item.verificationStatus === activeTab
          ? {
              ...item,
              isChecked: selectAllClicked,
            }
          : item
      )
    );
  }, [selectAllClicked, activeTab]);

  const handleItemCheckbox = (id: string): void => {
    setItems(
      items.map((item) =>
        item._id === id ? { ...item, isChecked: !item.isChecked } : item
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
              <th className={styles.tableHeadItem}>Mobile Number</th>
              <th className={styles.tableHeadItem}>License ID</th>
              <th className={styles.tableHeadItem}>License Plate #</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {items
              .filter((item) => item.verificationStatus=== activeTab)
              .map((item) => (
                <tr key={item._id}>
                  <td className={styles.tableData}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={item.isChecked}
                      onChange={() => handleItemCheckbox(item._id)}
                    ></input>
                  </td>
                  <td className={styles.tableData}>{item.dateApplied ? item.dateApplied : " "}</td>
                  <td className={styles.tableData}>{item.firstName + " " + item.lastName}</td>
                  <td className={styles.tableData}>{item.phone}</td>
                  <td className={styles.tableData}>{item.driverLicenseId ? item.driverLicenseId : " "}</td>
                  <td className={styles.tableData}>{item.licensePlate ? item.licensePlate : " "}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
