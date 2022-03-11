/**
 * JobService that interacts with the job documents in the database
 */
import mongoose from 'mongoose';
import { ServiceError, InternalError } from '../errors';
import { filterObject } from '../helpers';
import JobModel, { 
    FIELDS_OWNER_PERMITTED_TO_UPDATE, 
    OWNER_LIMITED_FIELDS,
    JOB_STATUS_CREATED,
} from '../models/job';
import { saveImage, deleteImage } from './image';
import { deregisterAppliedJob } from './user';

/**
 * Responsible for creating a job with `userId` as owner
 * @param {mongoose.Types.ObjectId} userId 
 * @param {object} jobData 
 * @param {list} jobImages 
 * @returns created job document
 */
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

/**
 * Updates the existing job document. 
 * Throws an error if `userid` is not the job owner
 * Extracts fields allowed to update from the `jobData` payload to update
 * @param {mongoose.Types.ObjectId} userId 
 * @param {mongoose.Types.ObjectId} jobId 
 * @param {object} jobData 
 * @param {list} jobImages 
 */
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
    jobData = filterObject(jobData, FIELDS_OWNER_PERMITTED_TO_UPDATE);

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

/**
 * Deletes a job document `jobId` and also erases its respective images
 * Throws error if `userId` does not own the job
 * @param {mongoose.Types.ObjectId} userId 
 * @param {mongoose.Types.ObjectId} jobId 
 */
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

/**
 * Gets the job document using `jobId`.
 * Uses `userId` to identify whether the request is coming from 
 * owner/trucker to ensure relevant data is returned
 * @param {mongoose.Types.ObjectId} jobId 
 * @param {mongoose.Types.ObjectId} userId 
 * @returns job document with relevant fields
 */
export async function getJob(jobId, userId) {
    console.debug('getJob service running');
    
    let job = await JobModel.findById(jobId);
    if (!job) {
        throw ServiceError.JOB_NOT_FOUND
    }

    job = job.toObject();

    // Extract parameters only relevant for the request
    if (!job.client.equals(userId)) { 
        // If owner did not perform request
        OWNER_LIMITED_FIELDS.forEach(field => delete job[field]);
    }
    
    return job;
}

/**
 * Adds an applicant `userId` to job `jobId`
 * @param {mongoose.Types.ObjectId} jobId 
 * @param {mongoose.Types.ObjectId} userId 
 */
export async function addJobApplicant(jobId, userId) {
    console.debug('addJobApplicant service running');

    let job = await JobModel.findById(jobId);
    if (!job) throw ServiceError.JOB_NOT_FOUND;

    if (userId in job.applicants) {
        throw ServiceError.DUPLICATE_JOB_APPLICATION_ATTEMPTED;
    }
    
    job.applicants.push({
        userId: userId,
        applyDate: new Date() // Uses current date as application date
    });
    
    try { await job.save() }
    catch (e) { throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack)}
}

/**
 * Assigns driver to `jobId`.
 * Throws error if userId does not own jobId
 * @param {mongoose.Types.ObjectId} jobId 
 * @param {mongoose.Types.ObjectId} userId 
 * @param {mongoose.Types.ObjectId} driverId 
 */
export async function assignDriver(jobId, userId, driverId) {
    console.debug('assignDriver service running');

    let job = await JobModel.findById(jobId);
    if (!job) throw ServiceError.JOB_NOT_FOUND;

    // Validate client job ownership
    if (!job.client.equals(userId)) {
        throw ServiceError.JOB_EDIT_PERMISSION_DENIED;
    }

    if (job.assignedDriverId !== null && job.assignedDriverId !== undefined) {
        throw ServiceError.DRIVER_ALREADY_ASSIGNED;
    }

    if (!driverId in job.applicants) {
        throw ServiceError.DRIVER_MUST_BE_APPLICANT;
    }

    job.assignedDriverId = mongoose.Types.ObjectId(driverId);

    try { await job.save() }
    catch (e) { throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack)}
}