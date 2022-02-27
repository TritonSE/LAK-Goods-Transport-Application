/**
 * JobService that interacts with the job documents in the database
 */
import { InternalError, ServiceError } from '../errors';
import JobModel from '../models/job';
import {
    saveImage
} from './image';

export async function createJob(user, jobData, jobImages) {
    console.debug('createJob service running')
    const imageIds = [];

    for (let image of jobImages) {
        let imageId = await saveImage(image);
        imageIds.push(imageId);
    }

    let job = null;
    try {
        job = await JobModel({
            ...jobData, //TODO Sanitize input
            client: user._id,
            applicants: [],
            imageIds: imageIds,
        });
    } catch (e) {
        throw ServiceError.INVALID_JOB_RECEIVED.addContext(e.stack);
    }
    
    //TODO Validate request fields like delievryDate, etc.

    try {
        const newJob = await job.save();
        return newJob;
    } catch (e) {
        throw ServiceError.INVALID_JOB_RECEIVED.addContext(e.stack);
    }
}

export async function updateJob(user, jobId, jobData, jobImages) {
    console.debug('updateJob service runnning');

    let originalJob = null;
    try {
        originalJob = await JobModel.findById(jobId);
    } catch (e) {
        throw ServiceError.JOB_NOT_FOUND.addContext(e.stack);
    }

    if (!originalJob.client.equals(user._id)) {
        throw ServiceError.JOB_EDIT_PERMISSION_DENIED;
    }

    //TODO Update images (remove and restore images for now)
    try {
        await JobModel.findOneAndUpdate({'_id': jobId}, jobData)
    } catch (e) {
        throw ServiceError.INVALID_JOB_UPDATE.addContext(e.stack);
    }
}

export async function getJob(jobId) {
    console.debug('getJob service running');
    //TODO Confirm if any auth is required
    //TODO Send images -- or just send image IDs and then send images through seperate request (preferred)
    
    return JobModel.findById(jobId);
}