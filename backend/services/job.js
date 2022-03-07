/**
 * JobService that interacts with the job documents in the database
 */
import { ServiceError, InternalError } from '../errors';
import { filterUpdatePayload } from '../helpers';
import JobModel, { 
    FIELDS_OWNER_PERMITTED_TO_UPDATE, 
    JOB_STATUS_CREATED,
} from '../models/job';
import { saveImage, deleteImage } from './image';
import { deregisterAppliedJob } from './user';

export async function createJob(userId, jobData, jobImages) {
    console.debug('createJob service running');
    const imageIds = [];

    // Store images
    for (let image of jobImages) {
        let imageId = await saveImage(image);
        imageIds.push(imageId);
    }

    // Create Job
    let job = null;
    try {
        job = await JobModel({
            ...jobData, //TODO Sanitize input
            client: userId,
            applicants: [],
            imageIds: imageIds,
            status: JOB_STATUS_CREATED,
        });
    } catch (e) {
        throw ServiceError.INVALID_JOB_RECEIVED.addContext(e.stack);
    }
    
    //TODO Validate request fields like delievryDate, etc.

    // Save Job
    try {
        return await job.save();
    } catch (e) {
        throw ServiceError.INVALID_JOB_RECEIVED.addContext(e.stack);
    }
}

export async function updateJob(userId, jobId, jobData, jobImages) {
    console.debug('updateJob service runnning');

    // Retrieve original job
    let originalJob = await JobModel.findById(jobId);
    if (!originalJob) {
        throw ServiceError.JOB_NOT_FOUND;
    }

    // Validate client job ownership
    if (!originalJob.client.equals(userId)) {
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

export async function deleteJob(userId, jobId) {
    console.debug('deleteJob service running')

    // Retrieve job
    let originalJob = await JobModel.findById(jobId);
    if (!originalJob) {
        throw ServiceError.JOB_NOT_FOUND;
    }

    // Validate client job ownership
    if (!originalJob.client.equals(userId)) {
        throw ServiceError.JOB_EDIT_PERMISSION_DENIED;
    }

    // Delete existing images
    let existingImageIds = originalJob.imageIds;
    for (let imageId of existingImageIds) {
        await deleteImage(imageId);
    }

    // Dergister applied user documents
    originalJob.applicants.forEach(async applicantId => await deregisterAppliedJob(applicantId, originalJob._id));
    
    // Delete Job document
    try {
        await JobModel.deleteOne({'_id': jobId}, null)
    } catch (e) {
        throw ServiceError.INVALID_JOB_RECEIVED.addContext(e.stack);
    }
}


export async function getJob(jobId) {
    console.debug('getJob service running');
    
    let res = await JobModel.findById(jobId);
    if (!res) {
        throw ServiceError.JOB_NOT_FOUND
    }
    return res;
}

export async function addJobApplicant(jobId, userId) {
    console.debug('addJobApplicant service running');

    let job = await JobModel.findById(jobId);
    if (!job) throw ServiceError.JOB_NOT_FOUND;

    if (userId in job.applicants) {
        throw ServiceError.DUPLICATE_JOB_APPLICATION_ATTEMPTED;
    }
    
    job.applicants.push({
        userId: userId,
        applyDate: new Date()
    });
    
    try { await job.save() }
    catch (e) { throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack)}
}