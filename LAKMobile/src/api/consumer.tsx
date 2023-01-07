/**
 * Functions to consume the API routes available
 */

import { ImageSourcePropType } from 'react-native';
import { API_URL } from '@env';
import { JobData, JobOwnerView, UserData } from './data';

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

export const getUsersByIds = async (
    userIds: Array<string>
): Promise<UserData[]> => {
    try {
        const url = `${USERS_URL}/get-by-ids?`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
export const getJobsByIds = async (jobIds: string[]): Promise<JobData[]> => {
    try {
        const url =
            `${GET_JOBS}/get-by-ids?` +
            new URLSearchParams({
                user: "client1",
            });
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
export const getJobs = async (search: string | null, owned: boolean, assigned: boolean, finished: boolean, page: number): Promise<{ jobs: JobData[] | JobOwnerView[], lastPage: boolean } | null> => {
    try {
        const url = `${GET_JOBS}?` + new URLSearchParams({
            owned: owned.toString(),
            assigned: assigned.toString(),
            finished: finished.toString(),
            offset: ((page - 1) * PAGE_SIZE).toString(),
            limit: PAGE_SIZE.toString(),
            user: 'client1', // TODO Remove after auth
            ...(search ? { search: search } : {})
        });
        const response = await fetch(url);
        let data = await response.json();
        return { jobs: data.jobs, lastPage: data.lastPage };
    } catch {
        return null;
    }
};

export const postJob = async (
    newJob: object
): Promise<{ jobId: string } | null> => {
    try {
        const url =
            `${GET_JOBS}?` +
            new URLSearchParams({
                user: "client1",
            });
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newJob),

        });
        let data = await response.json();
        return { jobId: data.jobId };
    } catch {
        return null;
    }
};

export const updateJob = async (
    jobId: string,
    updatedJob: object
): Promise<{ jobId: string } | null> => {
    try {
        const url =
            `${GET_JOBS}/${jobId}?` +
            new URLSearchParams({
                user: "client1",
            });
        const response = await fetch(url, {
            method: "PATCH",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedJob),
        });
        let data = await response.json();
        return { jobId: data.jobId };
    } catch {
        return null;
    }
};

export const deleteJob = async (
    jobId: string
): Promise<{ jobId: string } | null> => {
    try {
        const url =
            `${GET_JOBS}/${jobId}?` +
            new URLSearchParams({
                user: "client1",
            });

        const response = await fetch(url, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            },
        });
        let data = await response.json();
        return { jobId: data.jobId };
    } catch {
        return null;
    }
};

export const assignDriver = async (
    jobId: string,
    driverId: string
): Promise<{ message: string; driverId: string; jobId: string } | null> => {
    try {
        const url = `${GET_JOBS}/${jobId}/assign-driver`;
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ driverId: driverId }),
        });
        let data = await response.json();
        return {
            message: data.message,
            driverId: data.driverId,
            jobId: data.jobId,
        };
    } catch {
        return null;
    }
};

export const denyDriver = async (
    jobId: string,
    driverId: string,
): Promise<{ message: string; driverId: string; jobId: string } | null> => {
    try {
        const url = `${GET_JOBS}/${jobId}/deny-driver`;
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ driverId: driverId }),
        });
        let data = await response.json();
        return {
            message: data.message,
            driverId: data.driverId,
            jobId: data.jobId,
        };
    } catch {
        return null;
    }
}

export const imageIdToSource = (imageId: string): ImageSourcePropType => ({
    uri: `${API_URL}/api/images/${imageId}`,
});

/*
* Users
*/

// TODO remove (Dummy data)
export const getCurrentUser = (): string => {
    return '635247cc2fdd8166dd9a3747';
}

export const getUser = async (userId: string): Promise<UserData | null> => {
    try {
        const url = `${USERS_URL}/${userId}?` + new URLSearchParams({ user: 'client1' });
        const response = await fetch(url)
        let data = await response.json();
        data = data.user as UserData;
        return data;
    } catch {
        return null;
    }
}
