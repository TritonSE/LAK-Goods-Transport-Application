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
    job.insertOne(job).then((err) => {
        console.error('Error while saving job', err)
        if (err !== null) throw errors.Error(400, errors.INVALID_JOB_RECEIVED, err);
    });
    return job;
}

async function updateJob(id, jobData, jobImages) {
    let job = JobModel({
        ...jobData, // TODO Sanitize input
        imageIds: jobImages.map((image) => image.filename)
    });

    //TODO Validate request fields like delievryDate, etc.
    //TODO Consider best way to store images - (practice is to store in a FS like GridFS)
    job.updateOne({_id: ObjectId(id)}, job).then((err) => {
        console.error('Error while updating job', err)
        if (err !== null) throw errors.Error(400, errors.INVALID_JOB_RECEIVED, err);
    })
    return job;
}

async function deleteJob(id) {
    let job = JobModel({});

    job.deleteOne({_id: ObjectId(id)}).then((err) => {
        console.error('Error while deleting job', err)
        if (err !== null) throw errors.Error(400, errors.JOB_NOT_FOUND, err);
    });
    return job;
}


/**
 * JobService that interacts with the job documents in the database
 */
module.exports = {
    createJob,
    updateJob,
    deleteJob
}