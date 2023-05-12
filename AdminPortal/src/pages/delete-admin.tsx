import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Sidebar } from '../components/sidebar';
import styles from '@/styles/delete-admin.module.css'
import Image from 'next/image';

import PROFILE_LOGO_BG from '../../public/profile-logo-bg.svg'
import PROFILE_LOGO_PERSON from '../../public/profile-logo-person.svg'

type AdminUser = {
  id: string;
  name: string;
  phone: string;
  role: string;
};

const DeleteAdminPage: NextPage = () => {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUser>();

  useEffect(() => {
    const { id, name, phone, role } = router.query;

    setAdminUser({
      id: id as string,
      name: name as string,
      phone: phone as string,
      role: role as string,
    });
  }, [router.query]);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    
   <div>
        <Sidebar currentPage={'/admin'} />
        <div className={styles.outer}>
        <button onClick={handleGoBack} className={styles.back_button}>Go Back</button>
        <div className={styles.record}>
            <div className ={styles.logo}>
                <Image src={PROFILE_LOGO_BG} alt="PROFILE_LOGO_BG"  className={styles.PROFILE_LOGO_BG}/>
                <Image src={PROFILE_LOGO_PERSON} alt="PROFILE_LOGO_PERSON" className={styles.PROFILE_LOGO_PERSON}/>
            </div>
            
            <div className={styles.info_container}>
                {adminUser !== undefined && (
                <>
                    <p className={styles.role}>{adminUser.role}</p>
                    <p className={styles.name}>{adminUser.name}</p>
                    <p className={styles.phone}>{adminUser.phone}</p>
                </>
                )}        
            </div>

            <div className={styles.button_container}>
                <button className={styles.delete_button}>Delete Admin User</button>
            </div>
        </div>
            
        </div>
    </div>

  );
};

export default DeleteAdminPage;
