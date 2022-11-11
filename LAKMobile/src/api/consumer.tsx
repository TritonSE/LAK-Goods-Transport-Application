/**
 * Functions to consume the API routes available
 */

import { ImageSourcePropType } from 'react-native';
import { API_URL } from '@env';
import { JobData, JobOwnerView, UserData } from './data';

// change to http://10.0.2.2/api/jobs/ for Android Emulator
export const GET_JOBS = `http://10.0.2.2:3000/api/jobs`
export const GET_USER = `http://10.0.2.2:3000/api/users` // might need to change

export const getJobById = async (jobId: string): Promise<JobData | null> => {
    try {
        const url = `${GET_JOBS}/${jobId}?`;
        const response = await fetch(url)
        let data = await response.json();
        data = data.job as JobData;
        return data;
    } catch {
        return null;
    }
}


export const getUsersByIds = async (userIds: Array<string>): Promise<UserData[]> => {
    try {
        const url = `${GET_USER}/get-by-ids?`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userIds: [...userIds]
            })
        });
        let data = await response.json();
        data = data.users;
        return data;
    } catch {
        return [];
    }

}

/** Might consider removing */
export const getJobsByIds = async (jobIds: string[]): Promise<JobData[]> => {
    try {
        const url = `${GET_JOBS}/get-by-ids?` + new URLSearchParams({
            user: 'client1'
        });
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },     
            body: JSON.stringify({
                jobIds: [...jobIds]
            })
        });
        let data = await response.json();
        data = data.jobs;
        return data;
    } catch {
        return [];
    }
}

export const PAGE_SIZE = 5;

// Gets the list of job documents (with pagination parameters)
export const getJobs = async (owned: boolean, finished: boolean, page: number): Promise<{ jobs: JobData[] | JobOwnerView[], lastPage: boolean } | null> => {
    try {
        const url = `${GET_JOBS}?` + new URLSearchParams({
            owned: owned.toString(), 
            finished: finished.toString(),
            offset: ((page-1)*PAGE_SIZE).toString(),
            limit: PAGE_SIZE.toString(),
            user: 'client1' // TODO Remove after auth
        });
        const response = await fetch(url);
        let data = await response.json();
        return { jobs: data.jobs, lastPage: data.lastPage };
    } catch {
        return null;
    }
}

export const imageIdToSource = (imageId: string): ImageSourcePropType => ({
    uri: `${API_URL}/api/images/${imageId}`,
});
  