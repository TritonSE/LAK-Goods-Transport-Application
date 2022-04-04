/**
 * UserService that manages the User documents in the DB
 */
import UserModel from "../models/user";
import { InternalError } from "../errors";

export async function registerJob(userId, jobId, owned) {
    console.debug(`SERVICE: registerJob service running: userId - ${userId}, jobId - ${jobId}, owned - ${owned}`);

    const user = await UserModel.findById(userId);
    if (!user) {
        throw InternalError.USER_NOT_FOUND;
    }

    if (owned) {
        //TODO Fix use of in operator (use includes instead)
        if (!user.ongoingOwnedJobs.includes(jobId))
            user.ongoingOwnedJobs.push(jobId);
        else return false;
    } else {
        if (!user.ongoingAppliedJobs.includes(jobId))
            user.ongoingAppliedJobs.push(jobId);
        else return false;
    }
    
    try { await user.save() }
    catch (e) { throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack)}

    return true;
};

//TODO Combine deregisterOwnedJob and deregisterAppliedJob
export async function deregisterOwnedJob(userId, jobId) {
    console.debug(`SERVICE: deregisterOwnedJob service running: userId - ${userId}, jobId - ${jobId}`);

    const user = await UserModel.findById(userId);
    if (!user) {
        throw InternalError.USER_NOT_FOUND;
    }

    let index = user.ongoingOwnedJobs.indexOf(jobId);
    if (index !== -1) {
        user.ongoingOwnedJobs.splice(index, 1);
        try { await user.save() }
        catch (e) { throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack)}
        return;
    } 
    
    index = user.finishedOwnedJobs.indexOf(jobId);
    if (index !== -1) {
        user.finishedOwnedJobs.splice(index, 1);
        try { await user.save() }
        catch (e) { throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack)}
        return;
    }
}

export async function deregisterAppliedJob(userId, jobId) {
    console.debug(`SERVICE: deregisterAppliedJob service running: userId - ${userId}, jobId - ${jobId}`);

    const user = await UserModel.findById(userId);
    if (!user) { throw InternalError.USER_NOT_FOUND }

    let index = user.ongoingAppliedJobs.indexOf(jobId);
    if (index !== -1) {
        user.ongoingAppliedJobs.splice(index, 1);
        try { await user.save() }
        catch (e) { throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack)}
        return;
    }

    index = user.finishedAppliedJobs.indexOf(jobId);
    if (index !== -1) {
        user.finishedAppliedJobs.splice(index, 1);
        try { await user.save() }
        catch (e) { throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack)}
        return;
    }
}

export async function updateJobStatus(userId, jobId, owned, setComplete) {
    console.debug(`SERVICE: updateJobStatus service running: userId - ${userId}, jobId - ${jobId}, owned - ${owned}, setComplete - ${setComplete}`);

    const user = await UserModel.findById(userId);
    if (!user) { throw InternalError.USER_NOT_FOUND.addContext(userId) }

    let fromList, toList;
    if (owned && setComplete) {
        fromList = user.ongoingOwnedJobs;
        toList = user.finishedOwnedJobs;
    } else if (!owned && setComplete) {
        fromList = user.ongoingAppliedJobs;
        toList = user.finishedAppliedJobs;
    } else { 
        throw InternalError.OTHER.addContext('UserService: Possibly attempted to mark a job incomplete')
    }

    // Move from fromList to toList
    let index = fromList.indexOf(jobId);
    if (index !== -1) {
        fromList.splice(index, 1);
    }

    if (!toList.includes(jobId)) {
        toList.push(jobId);
    }

    try { await user.save() }
    catch (e) { throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack) }
}

export async function getJobIds(userId, owned, finished) {
    console.debug(`SERVICE: getJobIds service running: userId - ${userId}, owned - ${owned}, finished - ${finished}`);

    const user = await UserModel.findById(userId);
    if (!user) { throw InternalError.USER_NOT_FOUND }

    let jobIds = null;
    if (owned && finished)
        jobIds = user.finishedOwnedJobs;
    else if (owned && !finished) 
        jobIds = user.ongoingOwnedJobs;
    else if (!owned && finished) 
        jobIds = user.finishedAppliedJobs;
    else 
        jobIds = user.ongoingAppliedJobs;

    return jobIds;
}