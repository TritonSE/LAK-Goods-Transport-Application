import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer'; 

import {
    createJob,
    updateJob,
    getJob, deleteJob
} from '../services/job';
import { ValidationError } from '../errors';
import { SAMPLE_USER } from '../constants';

const routes = express.Router();

// Middleware that parses multipart/form-data request and extracts images into memory storage
const upload = multer({ storage: multer.memoryStorage() }).array("images");

routes.post('/jobs', upload, (req, res, next) => {
    console.info('Posting new Job');

    // TODO Add user auth

    createJob(
        SAMPLE_USER,
        req.body,
        req.files,
    )
    .then((job) => {res.status(200).send(job)})
    .catch(next);
});

routes.put('/jobs/:jobid', upload, (req, res, next) => {
    console.info('Updating job:', req.params.jobid);
    
    // TODO Add user auth

    if (!mongoose.Types.ObjectId.isValid(req.params.jobid)) {
        next(ValidationError.INVALID_OBJECT_ID); 
        return;
    }
    const jobId = mongoose.Types.ObjectId(req.params.jobid);
    const payload = req.body;
        
    updateJob(
        SAMPLE_USER,
        jobId,
        payload,
        req.files,
    ).then(() => {res.status(200).send('Job successfully updated')})
    .catch(next);
});

routes.delete('/jobs/:jobid', (req, res, next) => {
    console.info('Deleting job:', req.params.jobid);

    if (!mongoose.Types.ObjectId.isValid(req.params.jobid)) {
        next(ValidationError.INVALID_OBJECT_ID);
        return;
    }
    const jobId = mongoose.Types.ObjectId(req.params.jobid);

    deleteJob(
        jobId,
    ).then(() => {res.status(200).send('Job successfully deleted')})
        .catch(next);
});

routes.get('/jobs/:jobid', (req, res, next) => {
    console.info('Getting job:', req.params.jobid);

    if (!mongoose.Types.ObjectId.isValid(req.params.jobid)) {
        next(ValidationError.INVALID_OBJECT_ID);
    }
    const jobId = mongoose.Types.ObjectId(req.params.jobid);
    
    getJob(jobId)
    .then((job) => res.status(200).send(job))
    .catch(next);
});

export default routes;