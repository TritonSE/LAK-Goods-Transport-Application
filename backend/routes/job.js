import express from 'express';
import mongoose from 'mongoose';

import uploadImage from '../middlewares/upload';
import {
    createJob,
    updateJob,
    getJob
} from '../services/job';
import { INVALID_OBJECT_ID_RECEIVED_MSG } from './errors';
import { SAMPLE_USER } from '../constants';

const routes = express.Router();

routes.post('/jobs', uploadImage, (req, res) => { // Create a new job
    console.info('Posting new Job')
    // console.log('req: ', req.body); // Request text parameters  
    // console.log('req:', req.files) // Images in request
    console.log(SAMPLE_USER);
    createJob(
        SAMPLE_USER,
        req.body,
        req.files,
    ).then((job) => {res.status(200).send(job)})
});

routes.put('/jobs/:jobid', uploadImage, (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobid)) {
        res.status(400).json({message: INVALID_OBJECT_ID_RECEIVED_MSG})
    }
    const jobId = mongoose.Types.ObjectId(req.params.jobid);
    console.info('Updating job with ID: ', jobId);

    updateJob(
        SAMPLE_USER,
        jobId,
        req.body,
        req.files,
    ).then((originalJob) => {res.status(501).send()})
});

routes.get('/jobs/:jobid', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobid)) {
        res.status(400).json({message: INVALID_OBJECT_ID_RECEIVED_MSG})
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