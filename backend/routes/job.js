import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer'; 

import {
    createJob,
    updateJob,
    getJob
} from '../services/job';
import { ValidationError } from '../errors';
import { SAMPLE_USER } from '../constants';

const routes = express.Router();

// Middleware that parses multipart/form-data request and extracts images into memory storage
const upload = multer({ storage: multer.memoryStorage() }).array("images");

routes.post('/jobs', upload, (req, res, next) => {
    console.debug('Posting new Job')
    // console.log(SAMPLE_USER);

    createJob(
        SAMPLE_USER,
        req.body,
        req.files,
    )
    .then((job) => {res.status(200).send(job)})
    .catch(next);
});

routes.put('/jobs/:jobid', upload, (req, res, next) => {
    console.debug('Updating job:', req.params.jobid)

    if (!mongoose.Types.ObjectId.isValid(req.params.jobid)) {
        next(ValidationError.INVALID_OBJECT_ID); 
        return;
    }
    const jobId = mongoose.Types.ObjectId(req.params.jobid);

    updateJob(
        SAMPLE_USER,
        jobId,
        req.body,
        req.files,
    ).then(() => {res.status(200).send('Job successfully updated')})
    .catch(next);
});

routes.get('/jobs/:jobid', (req, res) => {
    console.debug('Getting job:', req.params.jobid);

    if (!mongoose.Types.ObjectId.isValid(req.params.jobid)) {
        next(ValidationError.INVALID_OBJECT_ID);
    }
    const jobId = mongoose.Types.ObjectId(req.params.jobid);
    console.info('Getting job with ID: ', jobId);
    getJob(jobId).then((job) => res.status(200).send(job));
});

routes.delete('/jobs/:jobid', (req, res) => { // Delete an existing job
    console.info('Deleting a job');
    let id = 0;
    // JobService.deleteJob(id).then((job) => {res.status(200).json({ job })})
});

export default routes;