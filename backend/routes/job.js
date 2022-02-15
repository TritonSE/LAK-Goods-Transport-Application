const routes = require('express').Router();
const multer  = require('multer'); // Parse multipart/form-data requests

const uploadImage = require('../middlewares/upload');

const {SAMPLE_USER} = require('../constants');
const JobService = require('../services/job');

const upload = multer({ dest: 'images/' }) // Uploads files to images/<path>

routes.post('/job', uploadImage, (req, res) => { // Create a new job
    console.info('Posting new Job')
    // console.log('req: ', req.body); // Request text parameters  
    // console.log('req:', req.files) // Images in request
    console.log(SAMPLE_USER);
    JobService.createJob(
        SAMPLE_USER,
        req.body,
        req.files,
    ).then((job) => {res.status(200).json({ job })})
});

routes.put('/job/:jobid', (req, res) => { // Update an existing job
    console.info('Updating existing job')
    let id = 0;
    JobService.updateJob(
        id,
        req.body,
        req.files,
    ).then((job) => {res.status(200).json({ job })})
});

routes.delete('/job/:jobid', (req, res) => { // Delete an existing job
    console.info('Deleting a job');
    let id = 0;
    JobService.deleteJob(id).then((job) => {res.status(200).json({ job })})
});

routes.get('/job/:jobid', (req, res) => { // Get an existing job
    console.info('Getting a job');
});

module.exports = routes;