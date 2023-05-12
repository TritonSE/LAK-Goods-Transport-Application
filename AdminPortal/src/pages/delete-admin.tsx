import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


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

      {adminUser && (
        <div>
          <button onClick={handleGoBack}>Go Back</button>
          <button>Delete Admin User</button>
        </div>
      )}
    </div>
  );
};

export default DeleteAdminPage;
