/**
 * UserService that manages the User documents in the DB
 */
import UserModel from "../models/user";
import { InternalError } from "../errors";

export async function registerJob(userId, jobId, owned) {
    console.debug('registerJob service running');

    const user = await UserModel.findById(userId);
    if (!user) {
        throw InternalError.USER_NOT_FOUND;
    }

    if (owned) {
        if (!(jobId in user.ongoingOwnedJobs))
            user.ongoingOwnedJobs.push(jobId);
        else return false;
    } else {
        if (!(jobId in user.ongoingAppliedJobs))
            user.ongoingAppliedJobs.push(jobId);
        else return false;
    }
    
    try { await user.save() }
    catch (e) { throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack)}

    return true;
};

export async function deregisterOwnedJob(userId, jobId) {
    console.debug('deregisterOwnedJob service running');

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
    console.debug('deregisterAppliedJob service running');

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

export async function getJobIds(userId, owned, finished) {
    console.debug('getJobIds service running', owned, finished);

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