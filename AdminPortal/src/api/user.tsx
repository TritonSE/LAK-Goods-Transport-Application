import { Option } from '@/pages/dashboard';

export interface UserData {
  phone: string;
  firstName: string;
  lastName: string;
  location: string;
  driverLicenseId?: string; // Hidden when anyone else other than the user viewing
  dateApplied: string;
  vehicleData?: {
    vehicleType: string;
    vehicleModel: string;
    vehicleMake: string;
    vehicleColor: string;
    imageIds: string[];
  };
  verificationStatus?: string;
}

const USERS_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;

export const getAllDrivers = async () => {
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
    console.log(data);
    data = data.users;
    return data;
  } catch {
    return [];
  }
};

export const updateUserStatus = async (
  userId: string,
  verificationStatus: Option
) => {
  try {
    const url = `${USERS_URL}/driver-verification-status?`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        verificationStatus: verificationStatus.value,
      }),
    });
    const data = await response.json();
    return { userId: data.userId };
  } catch {
    return null;
  }
};

export const getUser = async (userId: string): Promise<UserData | null> => {
  try {
    const url = `${USERS_URL}/${userId}`;
    const response = await fetch(url);
    let data = await response.json();
    data = data.user as UserData;
    return data;
  } catch {
    return null;
  }
};

export const getImageURL = (imageId: string): string => {
  return `${process.env.NEXT_PUBLIC_API_URL}/api/images/${imageId}`;
};

export const updateUser = async (
  userId: string,
  user: UserData
): Promise<{ userId: string } | null> => {
  try {
    console.log(user);
    const url = `${USERS_URL}/${userId}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return { userId: data.userId };
  } catch (error) {
    console.error(error);
    return null;
  }
};
