const errors = require('./errors');
const JobModel = require('../models/job');

async function createJob(user, jobData, jobImages) {
    console.log('Images:', jobImages);
    console.log('Data: ', jobData);
    
    let job = JobModel({
        ...jobData, //TODO Sanitize input
        client: user._id,
        applicants: [],
        imageIds: jobImages.map((image) => image.filename)
    });
    
    //TODO Validate request fields like delievryDate, etc.
    //TODO Consider best way to store images - (practice is to store in a FS like GridFS)
    job.save((err) => {
        console.error('Error while saving job', err)
        if (err !== null) throw errors.Error(400, errors.INVALID_JOB_RECEIVED, err);
    })
    return job;
}

async function updateJob(user, jobId, jobData, jobImages) {
    // TODO Authenticate user owns the job
    // TODO Think about a plan for updating images
    console.info('updateJob service triggered')
    console.log('Images:', jobImages);
    console.log('Data: ', jobData);

    let originalJob = JobModel.findByIdAndUpdate(jobId, jobData);
    return originalJob;
}

async function getJob(jobId) {
    // TODO Confirm if any auth is required
    // TODO Send images
    
    return JobModel.findById(jobId);
}

/**
 * JobService that interacts with the job documents in the database
 */
module.exports = {
    createJob,
    updateJob,
    getJob
}