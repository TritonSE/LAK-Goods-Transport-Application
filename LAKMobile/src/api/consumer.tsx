import { ImageSourcePropType } from 'react-native';
import { API_URL } from '@env';
import { JobData } from './data';

export const GET_JOBS = `${API_URL}/api/jobs`

export const getJobById = async (jobId: string): Promise<JobData | null> => {
    try {
        const url = `${GET_JOBS}/${jobId}?` + new URLSearchParams({user: 'client1'});
        const response = await fetch(url)
        let data = await response.json();
        data = data.job as JobData;
        return data;
    } catch {
        return null;
    }
}

export const getJobIds = async (owned: boolean, finished: boolean): Promise<string[]> => {
    try {
        const url = `${GET_JOBS}?` + new URLSearchParams({
            owned: owned.toString(), 
            finished: finished.toString(),
            user: 'client1' // TODO Remove after auth
        });
        const response = await fetch(url);
        let data = await response.json();
        data = data.jobIds as string[];
        return data;
    } catch {
        return [];
    }
}

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


export const imageIdToSource = (imageId: string): ImageSourcePropType => ({
    uri: `${API_URL}/api/images/${imageId}`,
});
  