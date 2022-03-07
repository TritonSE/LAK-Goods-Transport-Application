import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer'; 

import {
    createJob,
    updateJob,
    getJob,
    deleteJob,
    addJobApplicant,
} from '../services/job';
import {
    registerJob,
    deregisterOwnedJob,
    getJobIds
} from '../services/user';
import { InternalError, ValidationError } from '../errors';
import { SAMPLE_USER_ID } from '../constants';
import { stringToBoolean } from '../helpers';

const routes = express.Router();

// Middleware that parses multipart/form-data request and extracts images into memory storage
const upload = multer({ storage: multer.memoryStorage() }).array("images");

const getSessionUserId = () => SAMPLE_USER_ID; //TODO: Remove hardcoded SAMPLE_USER once user auth is setup

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
            req.files,
        );
        
        // Update User document
        await registerJob(userId, job._id, true);
    } catch (e) { 
        next(e);
        return;
    }

    res.status(200).send(`Job ID ${job._id} successfully created`) 
});

/**
 * PUT Update job attributes
 */
routes.put('/:jobid', upload, (req, res, next) => {
    console.info('Updating job:', req.params.jobid);

    const userId = getSessionUserId();

    if (!mongoose.Types.ObjectId.isValid(req.params.jobid)) {
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
    ).then(() => {res.status(200).send(`Job ID ${jobId} successfully updated`)})
    .catch(next);
});

/**
 * DELETE Job by ID
 */
routes.delete('/:jobid', async (req, res, next) => {
    console.info('Deleting job:', req.params.jobid);

    const userId = getSessionUserId();

    if (!mongoose.Types.ObjectId.isValid(req.params.jobid)) {
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
    
    res.status(200).send('Job successfully deleted')
});

/**
 * GET Job by ID
 */
routes.get('/:jobid', (req, res, next) => {
    console.info('Getting job:', req.params.jobid);

    if (!mongoose.Types.ObjectId.isValid(req.params.jobid)) {
        next(ValidationError.INVALID_OBJECT_ID);
        return;
    }
    const jobId = mongoose.Types.ObjectId(req.params.jobid);
    
    getJob(jobId)
    .then((job) => res.status(200).send(job))
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

    if (!mongoose.isValidObjectId(req.params.jobid)) {
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
export default routes;