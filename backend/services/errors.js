/**
 * Please add all errors types here.
 * 
 * For examples, check TSE Octavian - https://github.com/TritonSE/TSE-Oktavian/blob/main/backend/services/errors.js
 */

// Errors for Job
const Error = (status, code, message) => ({
    status: status,
    code: code,
    message: message
});

const INVALID_JOB_RECEIVED = 0;
const JOB_NOT_FOUND = 1;

module.exports = {
    Error,
    INVALID_JOB_RECEIVED,
    JOB_NOT_FOUND
}