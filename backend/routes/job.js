const routes = require('express').Router();
const multer  = require('multer'); // Parse multipart/form-data requests

const uploadImage = require('../middlewares/upload');

const {SAMPLE_USER} = require('../constants');
const JobService = require('../services/job');
const errors = require('./errors');
const { Types } = require('mongoose');

const upload = multer({ dest: 'images/' }) // Uploads files to images/<path>

routes.post('/jobs', uploadImage, (req, res) => { // Create a new job
    console.info('Posting new Job')
    // console.log('req: ', req.body); // Request text parameters  
    // console.log('req:', req.files) // Images in request
    console.log(SAMPLE_USER);
    JobService.createJob(
        SAMPLE_USER,
        req.body,
        req.files,
    ).then((job) => {res.status(200).send(job)})
});

routes.put('/jobs/:jobid', uploadImage, (req, res) => {
    if (!Types.ObjectId.isValid(req.params.jobid)) {
        res.status(400).json({message: errors.INVALID_OBJECT_ID_RECEIVED_MSG})
    }
    const jobId = Types.ObjectId(req.params.jobid);
    console.info('Updating job with ID: ', jobId);

    JobService.updateJob(
        SAMPLE_USER,
        jobId,
        req.body,
        req.files,
    ).then((originalJob) => {res.status(501).send()})
});

routes.get('/jobs/:jobid', (req, res) => {
    if (!Types.ObjectId.isValid(req.params.jobid)) {
        res.status(400).json({message: errors.INVALID_OBJECT_ID_RECEIVED_MSG})
    }
    const jobId = Types.ObjectId(req.params.jobid);
    console.info('Getting job with ID: ', jobId);
    JobService.getJob(jobId).then((job) => res.status(200).send(job));
})

routes.delete('/jobs/:jobid', (req, res) => { // Delete an existing job
    console.info('Deleting a job');
    let id = 0;
    // JobService.deleteJob(id).then((job) => {res.status(200).json({ job })})
});

module.exports = routes;