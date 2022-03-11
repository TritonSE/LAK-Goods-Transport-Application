import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer'; 

import {
    createJob,
    updateJob,
    getJob,
    deleteJob,
    addJobApplicant,
    assignDriver
} from '../services/job';
import {
    registerJob,
    deregisterOwnedJob,
    getJobIds
} from '../services/user';
import { InternalError, ValidationError } from '../errors';
import { DUMMY_IN_SESSION_USER } from '../constants';
import { stringToBoolean } from '../helpers';

const routes = express.Router();
const isValidId = mongoose.Types.ObjectId.isValid;

// Middleware that parses multipart/form-data request and extracts images into memory storage
const upload = multer({ storage: multer.memoryStorage() }).array("images");

const getSessionUserId = () => DUMMY_IN_SESSION_USER; //TODO: Remove hardcoded SAMPLE_USER once user auth is setup

/**
 * POST a new job
 */
routes.post('/', upload, async (req, res, next) => {
    console.info('Posting new Job');

    const userId = getSessionUserId();

    let job = null;
    try {
        // Create Job
        job = await createJob(
            userId,
            req.body,
            req.files || [],
        );
        
        // Update User document
        await registerJob(userId, job._id, true);
    } catch (e) { 
        next(e);
        return;
    }

    res.status(200).json({
        message: 'Job ID ${jobId} was successfully created',
        jobId: job._id,
    });
});

/**
 * PUT Update job attributes
 */
routes.put('/:jobid', upload, (req, res, next) => {
    console.info('Updating job:', req.params.jobid);

    const userId = getSessionUserId();

    if (!isValidId(req.params.jobid)) {
        next(ValidationError.INVALID_OBJECT_ID); 
        return;
    }
    const jobId = mongoose.Types.ObjectId(req.params.jobid);
    const payload = req.body;
        
    updateJob(
        userId,
        jobId,
        payload,
        req.files,
    ).then(() => {
        res.status(200).json({
            message: 'Job ID ${jobId} was successfully updated',
            jobId: jobId,
        });
    })
    .catch(next);
});

/**
 * DELETE Job by ID
 */
routes.delete('/:jobid', async (req, res, next) => {
    console.info('Deleting job:', req.params.jobid);

    const userId = getSessionUserId();

    if (!isValidId(req.params.jobid)) {
        next(ValidationError.INVALID_OBJECT_ID);
        return;
    }
    const jobId = mongoose.Types.ObjectId(req.params.jobid);

    try {
        // Update job owner document
        await deregisterOwnedJob(userId, jobId);
        
        // Remove Job document (updates applicants documents)
        await deleteJob(userId, jobId);
    } catch (e) { next(e) }
    
    res.status(200).json({
        message: 'Job ID ${jobId} was successfully deleted',
        jobId: jobId,
    });
});

/**
 * GET Job by ID
 */
routes.get('/:jobid', (req, res, next) => {
    console.info('Getting job:', req.params.jobid);

    if (!isValidId(req.params.jobid)) {
        next(ValidationError.INVALID_OBJECT_ID);
        return;
    }
    const jobId = mongoose.Types.ObjectId(req.params.jobid);
    const userId = getSessionUserId();

    getJob(jobId, userId)
    .then((job) => res.status(200).json({
        message: 'Job document sent as ${job}',
        job: job
    }))
    .catch(next);
});

/**
 * GET jobs for in session user
 * @params owned (boolean), completed (boolean), [page_number (int)], [page_size (int)]
 * @returns List of jobs according to pagination properties (if any)
 */
routes.get('/', async (req, res, next) => {
    console.info('Getting jobs', req.query);

    // Get request parameters
    const owned = stringToBoolean(req.query.owned);
    const finished = stringToBoolean(req.query.finished); 
    if (owned === null || finished === null) { // Invalid Boolean found
        next(ValidationError.INVALID_BOOLEAN_VALUE);
        return;
    }

    const userId = getSessionUserId();
    // TODO: Add user auth
    
    getJobIds(userId, owned, finished)
    .then((jobs) => {res.status(200).json({
        message: 'Find $count job IDs in $jobs',
        count: jobs.length,
        jobs: jobs
    })})
    .catch(next);
});

/**
 * PATCH Apply to a job
 */
routes.patch('/:jobid/apply', async (req, res, next) => {
    console.info('Applying to job, job -', req.params.jobid);

    if (!isValidId(req.params.jobid)) {
        next(ValidationError.INVALID_OBJECT_ID);
        return;
    }
    const jobId = req.params.jobid;
    const userId = getSessionUserId();
    
    try {
        await addJobApplicant(jobId, userId);
        let registered = await registerJob(userId, jobId, false);
        if (!registered) throw InternalError.OTHER.addContext('User job registration failed, despite valid application')
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

routes.patch('/:jobid/assign-driver', async (req, res, next) => {
    console.info('Assigning driver for the job, jobId:', req.params.jobid, 'driverId:', req.body.driverId)

    if (!isValidId(req.params.jobid) || !isValidId(req.body.driverId)) {
        next(ValidationError.INVALID_OBJECT_ID);
        return;
    }
    const jobId = req.params.jobid;
    const userId = getSessionUserId();
    const driverId = req.body.driverId;

    try {
        await assignDriver(jobId, userId, driverId);
    } catch (e) {
        next(e);
        return;
    }

    return res.status(200).json({
        message: 'Driver $driverId successfully assigned to $jobId',
        driverId: driverId,
        jobId: jobId,
    })
})

export default routes;