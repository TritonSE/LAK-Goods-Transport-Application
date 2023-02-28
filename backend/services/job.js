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
  JOB_STATUS_ASSIGNED,
  JOB_STATUS_COMPLETED,
} from '../models/job';
import { saveImage, deleteImage } from './image';

/**
 * @param {ObjectId} $userId
 * @param {{owned: boolean, finished: boolean, assigned: boolean}} queryOptions
 * @param {{limit: number, offset: number}} paginationOptions
 * @returns
 */
export async function getJobIds(
  userId,
  { owned, finished, assigned },
  { limit, offset },
  search
) {
  console.debug(
    `SERVICE: getJobIds service running: {owned - ${owned}, finished - ${finished}, assigned - ${assigned}}, search - ${search}, paginationOptions: {limit: ${limit}, offset: ${offset}}`
  );
  const additionalQuery = {
    status: finished
      ? { $eq: JOB_STATUS_COMPLETED }
      : { $ne: JOB_STATUS_COMPLETED },
    ...(search ? { $text: { $search: `"${search}"` } } : null),
  };

  const paginationOptions = { limit: limit, skip: offset };
  if (owned) {
    const response = await JobModel.find(
      {
        client: userId,
        ...additionalQuery,
      },
      null,
      paginationOptions
    ).exec();
    return response;
  }
  if (assigned) {
    const response = await JobModel.find(
      {
        assignedDriverId: userId,
        ...additionalQuery,
      },
      null,
      paginationOptions
    ).exec();
    return response;
  }
  const response = await JobModel.find(
    // Find Jobs Query
    {
      client: { $ne: userId },
      $or: [{ assignedDriverId: null }, { assignedDriverId: userId }],
      ...additionalQuery,
    },
    null,
    paginationOptions
  ).exec();
  return response;
}

/**
 * Responsible for creating a job with `userId` as owner
 * @param {mongoose.Types.ObjectId} userId
 * @param {object} jobData
 * @param {list} jobImages
 * @returns created job document
 */
export async function createJob(userId, jobData, jobImages) {
  console.debug(
    `SERVICE: createJob service running: userId - ${userId}, jobData - payload`
  );
  // Store images
  const imageIds = [];
  await Promise.all(
    jobImages.map(async (image) => {
      const imageId = await saveImage(image);
      imageIds.push(imageId);
    })
  );
  // Create Job
  let job = null;
  try {
    job = await JobModel({
      ...jobData, // TODO Sanitize input
      client: userId,
      applicants: [],
      imageIds: imageIds,
      status: JOB_STATUS_CREATED,
    });
  } catch (e) {
    throw ServiceError.INVALID_JOB_RECEIVED.addContext(e.stack);
  }

  // TODO Validate request fields like delievryDate, etc.

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
  console.debug(
    `SERVICE: updateJob service runnning: jobId - ${jobId}, userId - ${userId}, jobData - payload, jobImages - files`
  );
  // Retrieve original job
  const originalJob = await JobModel.findById(jobId);
  if (!originalJob) {
    throw ServiceError.JOB_NOT_FOUND;
  }

  // Validate client job ownership
  if (!originalJob.client === userId) {
    throw ServiceError.JOB_EDIT_PERMISSION_DENIED;
  }

  // Ensure updated fields are only getting updated
  jobData = filterObject(jobData, FIELDS_OWNER_PERMITTED_TO_UPDATE);

  // TODO Find a better way of updating images

  // Delete existing images
  const existingImageIds = originalJob.imageIds;
  await Promise.all(
    existingImageIds.map(async (imageId) => {
      await deleteImage(imageId);
    })
  );
  // Add new images
  const newImageIds = [];
  await Promise.all(
    jobImages.map(async (image) => {
      const imageId = await saveImage(image);
      newImageIds.push(imageId);
    })
  );
  jobData = {
    ...jobData,
    imageIds: newImageIds,
  };

  try {
    await JobModel.findOneAndUpdate({ _id: jobId }, jobData);
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
  console.debug(
    `SERVICE: deleteJob service running: jobId - ${jobId}, userId - ${userId}`
  );

  // Retrieve job
  const originalJob = await JobModel.findById(jobId);
  if (!originalJob) {
    throw ServiceError.JOB_NOT_FOUND;
  }

  // Validate client job ownership
  if (originalJob.client !== userId) {
    throw ServiceError.JOB_EDIT_PERMISSION_DENIED;
  }

  // Delete existing images
  const existingImageIds = originalJob.imageIds;

  await Promise.all(
    existingImageIds.map(async (imageId) => {
      await deleteImage(imageId);
    })
  );

  // Delete Job document
  try {
    await JobModel.deleteOne({ _id: jobId }, null);
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
  console.debug(
    `SERVICE: getJob service running: jobId - ${jobId}, userId - ${userId}`
  );

  let job = await JobModel.findById(jobId);
  if (!job) {
    throw ServiceError.JOB_NOT_FOUND;
  }

  job = job.toObject();

  // Extract parameters only relevant for the request
  if (job.client !== userId) {
    // If owner did not perform request
    OWNER_LIMITED_FIELDS.forEach((field) => delete job[field]);
  }

  return job;
}

/**
 * Gets the job documents for multiple $jobIds
 * Uses `userId` to identify whether the request is coming from
 * owner/trucker to ensure relevant data is returned
 * @param {*} jobId
 * @param {*} userId
 */
export async function getJobs(jobIds, userId) {
  console.debug(
    `SERVICE: getJobs service running: jobIds - ${jobIds}, userId - ${userId}`
  );

  const jobs = [];
  await Promise.all(
    jobIds.map(async (jobId) => {
      const job = await getJob(jobId, userId);
      jobs.push(job);
    })
  );
  return jobs;
}

/**
 * Adds an applicant `userId` to job `jobId`
 * @param {mongoose.Types.ObjectId} jobId
 * @param {mongoose.Types.ObjectId} userId
 */
export async function addJobApplicant(jobId, userId) {
  console.debug(
    `SERVICE: addJobApplicant service running: jobId - ${jobId}, userId - ${userId}`
  );

  const job = await JobModel.findById(jobId);
  if (!job) throw ServiceError.JOB_NOT_FOUND;

  if (job.status !== JOB_STATUS_CREATED) {
    throw ServiceError.JOB_CLOSED_FOR_APPLICATION;
  }

  if (job.applicants.find((applicant) => applicant.userId === userId)) {
    throw ServiceError.DUPLICATE_JOB_APPLICATION_ATTEMPTED;
  }

  job.applicants.push({
    userId: userId,
    applyDate: new Date(), // Uses current date as application date
  });

  try {
    await job.save();
  } catch (e) {
    throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack);
  }
}

/**
 * Denies an applicant `userId` from job `jobId`
 * Throws error if userId if userId does not own jobId
 * @param {mongoose.Types.ObjectId} jobId
 * @param {mongoose.Types.ObjectId} userId
 * @param {mongoose.Types.ObjectId} driverId
 */
export async function denyDriver(jobId, userId, driverId) {
  console.debug(
    `SERVICE: denyDriver service running: jobId - ${jobId}, userId - ${userId}, driverId - ${driverId}`
  );

  const job = await JobModel.findById(jobId);
  if (!job) throw ServiceError.JOB_NOT_FOUND;

  // Validate client job ownership
  if (job.client !== userId) {
    throw ServiceError.JOB_EDIT_PERMISSION_DENIED;
  }

  const applicantIndex = job.applicants.findIndex(
    (applicant) => applicant.userId === driverId
  );

  if (applicantIndex === -1) {
    throw ServiceError.DRIVER_MUST_BE_APPLICANT;
  }

  job.applicants.splice(applicantIndex, 1);

  try {
    await job.save();
  } catch (e) {
    throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack);
  }
}

/**
 * Assigns driver to `jobId`.
 * Throws error if userId does not own jobId
 * @param {mongoose.Types.ObjectId} jobId
 * @param {mongoose.Types.ObjectId} userId
 * @param {mongoose.Types.ObjectId} driverId
 */
export async function assignDriver(jobId, userId, driverId) {
  console.debug(
    `SERVICE: assignDriver service running: jobId - ${jobId}, userId - ${userId}, driverId - ${driverId}`
  );

  const job = await JobModel.findById(jobId);
  if (!job) throw ServiceError.JOB_NOT_FOUND;

  // Validate client job ownership
  if (job.client !== userId) {
    throw ServiceError.JOB_EDIT_PERMISSION_DENIED;
  }

  if (job.status !== JOB_STATUS_CREATED) {
    throw ServiceError.DRIVER_ALREADY_ASSIGNED;
  }

  if (!job.applicants.find((applicant) => applicant.userId === driverId)) {
    throw ServiceError.DRIVER_MUST_BE_APPLICANT;
  }

  job.assignedDriverId = mongoose.Types.ObjectId(driverId);
  job.status = JOB_STATUS_ASSIGNED;
  job.startDate = new Date();

  try {
    await job.save();
  } catch (e) {
    throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack);
  }
}

export async function completeJob(jobId, userId) {
  console.debug(
    `SERVICE: completeJob service running: jobId - ${jobId}, userId - ${userId}`
  );

  const job = await JobModel.findById(jobId);
  if (!job) throw ServiceError.JOB_NOT_FOUND;

  // Validate client job ownership
  if (job.client !== userId) {
    throw ServiceError.JOB_EDIT_PERMISSION_DENIED;
  }

  if (job.assignedDriverId == null) {
    // Soft null check
    throw ServiceError.DRIVER_NOT_ASSIGNED;
  }

  // Update job status
  job.status = JOB_STATUS_COMPLETED;
  try {
    await job.save();
  } catch (e) {
    throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack);
  }
}
