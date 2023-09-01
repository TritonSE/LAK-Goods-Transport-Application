import { Sidebar } from '../components/sidebar';
import { useEffect, useState } from 'react';
import { authCookieSet } from '../context/AuthContext';
import { useRouter } from 'next/router';
import styles from '@/styles/Driver.module.css';
import { UserData, getImageURL, getUser, updateUser } from '@/api/user';

export default function Driver() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
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
      setUserId(userId);
      getUser(userId).then((userData) => {
        if (userData) {
          setUser(userData);
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
  }, [router]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userId && user) {
      const newUser = JSON.parse(JSON.stringify(user));
      newUser.driverLicenseId = licenseID;
      newUser.vehicleData = {
        vehicleType,
        vehicleModel,
        vehicleMake,
        vehicleColor,
      };
      await updateUser(userId, newUser);
    }
  };

  return (
    <main className={styles.main}>
      <Sidebar currentPage={'/dashboard'} />
      <div className={styles.container}>
        <button
          onClick={() => router.push('/dashboard')}
          className={styles.back}
        >
          {'< Back to Dashboard'}
        </button>
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>{name}</h1>
          <h2 className={styles.subheader}>{phone}</h2>
        </div>
        <div className={styles.content}>
          <form className={styles.form}>
            <label className={styles.formLabel}>
              <h3>License ID</h3>
              <input
                type="text"
                className={styles.textInput}
                value={licenseID}
                onChange={(e) => setLicenseID(e.target.value)}
              />
            </label>
            <label className={styles.formLabel}>
              <h3>Vehicle Type</h3>
              <input
                type="text"
                className={styles.textInput}
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              />
            </label>
            <label className={styles.formLabel}>
              <h3>Vehicle Model</h3>
              <input
                type="text"
                className={styles.textInput}
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
              />
            </label>
            <label className={styles.formLabel}>
              <h3>Vehicle Make</h3>
              <input
                type="text"
                className={styles.textInput}
                value={vehicleMake}
                onChange={(e) => setVehicleMake(e.target.value)}
              />
            </label>
            <label className={styles.formLabel}>
              <h3>Vehicle Color</h3>
              <input
                type="text"
                className={styles.textInput}
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
            </label>

            <button className={styles.submit} onClick={handleSubmit}>
              <h3>Submit Changes</h3>
            </button>
          </form>
          {vehiclePhotos.length ? (
            <div className={styles.vehiclePhotos}>
              <h3>Vehicle Photos</h3>
              <div className={styles.photoContainer}>
                {vehiclePhotos.map((imageId) => (
                  <img
                    className={styles.image}
                    src={getImageURL(imageId)}
                    key={imageId}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
