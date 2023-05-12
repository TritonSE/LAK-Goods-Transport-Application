import { API_URL } from '@env';
import { CreateUserForm } from '.';

export const USERS_URL = `${API_URL}/api/users`;

/**
 * @param formData Information from the Create New Account form
 * @returns The newly created user's UUID, or null if there was an error
 */
export const createNewUser = async (formData: CreateUserForm): Promise<string | null> => {
  try {
    const url = `${USERS_URL}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    return data.userId;
  } catch {
    return null;
  }
};