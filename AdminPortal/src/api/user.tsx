const USERS_URL = `${process.env.REACT_APP_API_URL}/api/users`;
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
    data = data.users;
    return data;
  } catch {
    return [];
  }
};

export const updateUser = async (
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
