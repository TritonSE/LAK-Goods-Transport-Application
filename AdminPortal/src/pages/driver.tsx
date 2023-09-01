import { Sidebar } from '../components/sidebar';
import { useEffect, useState } from 'react';
import { authCookieSet } from '../context/AuthContext';
import { useRouter } from 'next/router';
import styles from '@/styles/Driver.module.css';
import { getUser } from '@/api/user';

export default function Driver() {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [licenseID, setLicenseID] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const [vehicleModel, setVehicleModel] = useState<string>('');
  const [vehicleMake, setVehicleMake] = useState<string>('');
  const [vehicleColor, setVehicleColor] = useState<string>('');
  const [vehiclePhotos, setVehiclePhotos] = useState<string[]>([]);

  useEffect(() => {
    if (!authCookieSet()) {
      router.push('/login');
    }

    const { userId } = router.query;
    if (typeof userId === 'string') {
      getUser(userId).then((userData) => {
        if (userData) {
          setName(userData.firstName + ' ' + userData.lastName);
          setPhone(userData.phone);
          setLicenseID(userData.driverLicenseId || '');
          setVehicleType(userData.vehicleData?.vehicleType || '');
          setVehicleModel(userData.vehicleData?.vehicleModel || '');
          setVehicleMake(userData.vehicleData?.vehicleMake || '');
          setVehicleColor(userData.vehicleData?.vehicleColor || '');
          setVehiclePhotos(userData.vehicleData?.imageIds || []);
        }
      });
    }
  });

  return (
    <main className={styles.main}>
      <Sidebar currentPage={'/dashboard'} />
      <div className={styles.container}>
        <button
          onClick={() => router.push('/dashboard')}
          className={styles.back}
        >
          Back
        </button>
      </div>
    </main>
  );
}
