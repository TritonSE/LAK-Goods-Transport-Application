import express from 'express';
import multer from 'multer'; 

import {
    createJob,
    updateJob,
    getJob,
    deleteJob,
    addJobApplicant,
    assignDriver,
    completeJob,
    getJobs
} from '../services/job';
import { ValidationError } from '../errors';
import { getSessionUserId } from '../constants';
import { stringToBoolean, validateId } from '../helpers';

const routes = express.Router();

// Middleware that parses multipart/form-data request and extracts images into memory storage
const upload = multer({ storage: multer.memoryStorage() }).array("images");

/**
 * POST a new job
 */
routes.post('/', upload, async (req, res, next) => {
    console.info('ROUTE: Posting new Job');
    
    let job = null;
    try {
        const userId = getSessionUserId(req);

        // Create Job
        job = await createJob(
            userId,
            req.body,
            req.files || [],
        );
    } catch (e) { 
        next(e);
        return;
    }

    res.status(200).json({
        message: 'Job ID $jobId was successfully created',
        jobId: job._id,
    });
});

/**
 * PATCH Update job attributes
 */
routes.patch('/:jobid', upload, async (req, res, next) => {
    console.info('ROUTE: Updating job:', req.params.jobid);
    
    let jobId = null;
    try {
        jobId = validateId(req.params.jobid);
        const payload = req.body;

        const userId = getSessionUserId(req);

        await updateJob(
            userId,
            jobId,
            payload,
            req.files,
        );
    } catch (e) {
        next(e);
        return;
    }

    res.status(200).json({
        message: 'Job ID $jobId was successfully updated',
        jobId: jobId,
    });
});

/**
 * DELETE Job by ID
 */
routes.delete('/:jobid', async (req, res, next) => {
    console.info('ROUTE: Deleting job:', req.params.jobid);

    let jobId = null;
    try {
        const userId = getSessionUserId(req);
        jobId = validateId(req.params.jobid);
    
        // Remove Job document (updates applicants documents)
        await deleteJob(userId, jobId);
    } catch (e) { 
        next(e) 
        return;
    }

    res.status(200).json({
        message: 'Job ID $jobId was successfully deleted',
        jobId: jobId,
    });
});

/**
 * POST Get Job documents using IDs
 * (Due to limitation of GET with body, we are using POST here)
 */
 routes.post('/get-by-ids', async (req, res, next) => {
    console.info('ROUTE: Getting job document by IDs - jobIds', req.body.jobIds);

    let jobIds = req.body.jobIds;
    let jobs = null;
    try {
        let userId = getSessionUserId(req);
        // Validate IDs
        for (let jobId of jobIds) {
            validateId(jobId);
        }

        jobs = await getJobs(jobIds, userId);
    } catch(e) {
        next(e);
        return;
    }
    res.status(200).json({
        message: 'Job documents sent as ${jobs}',
        jobs: jobs
    });
});

/**
 * GET Job by ID
 */
routes.get('/:jobid', async (req, res, next) => {
    console.info('ROUTE: Getting job:', req.params.jobid);

    let job = null;
    try {
        const jobId = validateId(req.params.jobid);
        const userId = getSessionUserId(req);

        job = await getJob(jobId, userId);
    } catch (e) {
        next(e);
        return;
    }
    
    res.status(200).json({
        message: 'Job document sent as ${job}',
        job: job
    })
});

/**
 * GET jobs for in session user
 * @params owned (boolean), completed (boolean), [offset (int)], [limit (int)]
 * @returns List of jobs according to pagination properties (if any)
 */
routes.get('/', async (req, res, next) => {
    console.info('ROUTE: Getting jobs', req.query);

    let jobs = null;
    let lastPage = false;
    try {
        // Get request parameters
        const owned = stringToBoolean(req.query.owned);
        const finished = stringToBoolean(req.query.finished); 
        if (owned === null || finished === null) { // Invalid Boolean found
            throw ValidationError.INVALID_BOOLEAN_VALUE;
        }

        let offset = req.query.offset;
        let limit = req.query.limit;

        if (!isNaN(offset) && !isNaN(limit)) {
            offset = parseInt(offset);
            limit = parseInt(limit);
        } else if (offset !== undefined || limit !== undefined) {
            throw ValidationError.INVALID_PAGINATION_INPUT;
        }

        const userId = getSessionUserId(req);
        // TODO: Add user auth

        let jobIds = await getJobIds(userId, owned, finished);
        
        lastPage = jobIds.length <= offset + limit;

        // Apply pagination
        if (offset !== undefined && limit !== undefined) {
            jobIds = jobIds.slice(offset, offset + limit);
        }
        jobs = await getJobs(jobIds, userId);

    } catch (e) {
        next(e);
        return;
    }
    
    res.status(200).json({
        message: 'Job documents sent as ${jobs}',
        jobs: jobs,
        lastPage: lastPage,
    })
});

/**
 * PATCH Apply to a job
 */
routes.patch('/:jobid/apply', async (req, res, next) => {
    console.info('ROUTE: Applying to job, job -', req.params.jobid);

    let jobId, userId;
    try {
        jobId = validateId(req.params.jobid);
        userId = getSessionUserId(req);

        await addJobApplicant(jobId, userId);
    } catch (e) {
        next(e);
        return;
    }

    res.status(200).json({
        message: 'Job $jobId successfully applied by $userId',
        jobId: jobId,
        userId: userId,
    });
})

/**
 * PATCH Assign driver for a job
 */
routes.patch('/:jobid/assign-driver', async (req, res, next) => {
    console.info('ROUTE: Assigning driver for the job, jobId:', req.params.jobid, 'driverId:', req.body.driverId)

    let driverId, jobId;
    try {
        jobId = validateId(req.params.jobid);
        driverId = validateId(req.body.driverId);
        const userId = getSessionUserId(req);

        await assignDriver(jobId, userId, driverId);
    } catch (e) {
        console.log('error', e)
        next(e);
        return;
    }

    res.status(200).json({
        message: 'Driver $driverId successfully assigned to $jobId',
        driverId: driverId,
        jobId: jobId,
    })
})

/**
 * PATCH Mark job as complete
 */
routes.patch('/:jobid/complete', async (req, res, next) => {
    console.info('ROUTE: Marking job as complete. jobId:', req.params.jobid);

    let jobId;
    try {
        jobId = validateId(req.params.jobid);
        const userId = getSessionUserId(req);

        await completeJob(jobId, userId);
    } catch (e) {
        next(e);
        return;
    }

    res.status(200).json({
        message: 'Job $jobId marked as completed',
        jobId: jobId
    });
})

export default routes;