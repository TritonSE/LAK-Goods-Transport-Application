import { ImageSourcePropType } from 'react-native';
import { API_URL } from '@env';
import { JobData, JobOwnerView } from './data';

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

const PAGE_SIZE = 5;
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
  