/**
 * JobService that interacts with the job documents in the database
 */
import { CustomError, InternalError, ServiceError } from '../errors';
import JobModel, { FIELDS_OWNER_PERMITTED_TO_UPDATE } from '../models/job';
import { saveImage, deleteImage } from './image';

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
        return await job.save();
    } catch (e) {
        throw ServiceError.INVALID_JOB_RECEIVED.addContext(e.stack);
    }
}

function filterUpdatePayload(payload, allowedFields) {
    const filtered = {}  
    allowedFields.forEach(field => {
      if (field in payload) filtered[field] = payload[field];
    });
    return filtered;
}

export async function updateJob(user, jobId, jobData, jobImages) {
    console.debug('updateJob service runnning');

    // Retrieve original job
    let originalJob = await JobModel.findById(jobId);
    if (!originalJob) {
        throw ServiceError.JOB_NOT_FOUND;
    }

    // Validate client job ownership
    if (!originalJob.client.equals(user._id)) {
        throw ServiceError.JOB_EDIT_PERMISSION_DENIED;
    }

    // Ensure updated fields are only getting updated
    jobData = filterUpdatePayload(jobData, FIELDS_OWNER_PERMITTED_TO_UPDATE);

    //TODO Find a better way of updating images

    // Delete existing images
    let existingImageIds = originalJob.imageIds;
    for (let imageId of existingImageIds) {
        await deleteImage(imageId);
    }

    // Add new images
    let newImageIds = [];
    for (let image of jobImages) {
        let imageId = await saveImage(image);
        newImageIds.push(imageId);
    }
    
    jobData = {
        ...jobData,
        imageIds: newImageIds,
    }
    
    try {
        await JobModel.findOneAndUpdate({'_id': jobId}, jobData)
    } catch (e) {
        throw ServiceError.INVALID_JOB_RECEIVED.addContext(e.stack);
    }
}

export async function deleteJob(jobId) {
    console.debug('deleteJob service running')

    // Retrieve job
    let originalJob = await JobModel.findById(jobId);
    if (!originalJob) {
        throw ServiceError.JOB_NOT_FOUND;
    }

    // TODO Validate client job ownership

    // Delete existing images
    let existingImageIds = originalJob.imageIds;
    for (let imageId of existingImageIds) {
        await deleteImage(imageId);
    }

    try {
        await JobModel.deleteOne({'_id': jobId}, null)
    } catch (e) {
        throw ServiceError.INVALID_JOB_RECEIVED.addContext(e.stack);
    }
}


export async function getJob(jobId) {
    console.debug('getJob service running');
    //TODO Confirm if any auth is required
    //TODO Send images -- or just send image IDs and then send images through seperate request (preferred)
    
    let res = await JobModel.findById(jobId);
    if (!res) {
        throw ServiceError.JOB_NOT_FOUND
    }
    return res;
}