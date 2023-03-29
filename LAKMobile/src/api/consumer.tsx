/**
 * Functions to consume the API routes available
 */

import { ImageSourcePropType } from 'react-native';
import { API_URL } from '@env';
import { JobData, JobOwnerView, UserData, CreateUserForm } from './data';

export const GET_JOBS = `${API_URL}/api/jobs`;
export const USERS_URL = `${API_URL}/api/users`;

export const getJobById = async (jobId: string): Promise<JobData | null> => {
  try {
    const url = `${GET_JOBS}/${jobId}?`;
    const response = await fetch(url);
    let data = await response.json();
    data = data.job as JobData;
    return data;
  } catch {
    return null;
  }
};

export const getUsersByIds = async (userIds: Array<string>): Promise<UserData[]> => {
  try {
    const url = `${USERS_URL}/get-by-ids?`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userIds: [...userIds],
      }),
    });
    let data = await response.json();
    data = data.users;
    return data;
  } catch {
    return [];
  }
};

/** Might consider removing */
export const getJobsByIds = async (user: string, jobIds: string[]): Promise<JobData[]> => {
  try {
    const url =
      `${GET_JOBS}/get-by-ids?` +
      new URLSearchParams({
        user,
      });
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobIds: [...jobIds],
      }),
    });
    let data = await response.json();
    data = data.jobs;
    return data;
  } catch {
    return [];
  }
};

export const PAGE_SIZE = 5;

// Gets the list of job documents (with pagination parameters)
export const getJobs = async (
  userId: string,
  search: string | null,
  owned: boolean,
  assigned: boolean,
  finished: boolean,
  page: number
): Promise<{ jobs: JobData[] | JobOwnerView[]; lastPage: boolean } | null> => {
  try {
    const url =
      `${GET_JOBS}?` +
      new URLSearchParams({
        owned: owned.toString(),
        assigned: assigned.toString(),
        finished: finished.toString(),
        offset: ((page - 1) * PAGE_SIZE).toString(),
        limit: PAGE_SIZE.toString(),
        user: userId, // The user making the API call
        ...(search ? { search: search } : {}),
      });
    const response = await fetch(url);
    const data = await response.json();
    return { jobs: data.jobs, lastPage: data.lastPage };
  } catch {
    return null;
  }
};

export const postJob = async (
  userId: string,
  newJob: FormData
): Promise<{ jobId: string } | null> => {
  try {
    const url =
      `${GET_JOBS}?` +
      new URLSearchParams({
        user: userId,
      });
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: newJob,
    });
    const data = await response.json();
    return { jobId: data.jobId };
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateJob = async (
  userId: string,
  jobId: string,
  updatedJob: FormData
): Promise<{ jobId: string } | null> => {
  try {
    const url =
      `${GET_JOBS}/${jobId}?` +
      new URLSearchParams({
        user: userId,
      });
    const response = await fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: updatedJob,
    });
    const data = await response.json();
    return { jobId: data.jobId };
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteJob = async (
  userId: string,
  jobId: string
): Promise<{ jobId: string } | null> => {
  try {
    const url =
      `${GET_JOBS}/${jobId}?` +
      new URLSearchParams({
        user: userId,
      });

    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = await response.json();
    return { jobId: data.jobId };
  } catch {
    return null;
  }
};

export const assignDriver = async (
  userId: string,
  jobId: string,
  driverId: string
): Promise<{ message: string; driverId: string; jobId: string } | null> => {
  try {
    console.log({ jobId, driverId });
    const url =
      `${GET_JOBS}/${jobId}/assign-driver?` +
      new URLSearchParams({
        user: userId,
      });
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobId, driverId }),
    });
    const data = await response.json();
    return {
      message: data.message,
      driverId: data.driverId,
      jobId: data.jobId,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const denyDriver = async (
  jobId: string,
  driverId: string
): Promise<{ message: string; driverId: string; jobId: string } | null> => {
  try {
    const url = `${GET_JOBS}/${jobId}/deny-driver`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ driverId: driverId }),
    });
    const data = await response.json();
    return {
      message: data.message,
      driverId: data.driverId,
      jobId: data.jobId,
    };
  } catch {
    return null;
  }
};

export const imageIdToSource = (imageId: string): ImageSourcePropType => {
  return {
    uri: `${API_URL}/api/images/${imageId}`,
  };
};

/*
 * Users
 */

export const getUser = async (
  requestingUserId: string,
  userId: string
): Promise<UserData | null> => {
  try {
    const url = `${USERS_URL}/${userId}?` + new URLSearchParams({ user: requestingUserId });
    const response = await fetch(url);
    let data = await response.json();
    data = data.user as UserData;
    return data;
  } catch {
    return null;
  }
};

export const updateUser = async (
  userId: string,
  updatedUser: FormData
): Promise<{ userId: string } | null> => {
  try {
    const url = `${USERS_URL}/${userId}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: updatedUser,
    });
    const data = await response.json();
    return { userId: data.userId };
  } catch {
    return null;
  }
};
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
