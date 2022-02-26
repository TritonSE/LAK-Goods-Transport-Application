/**
 * Please add all errors types here.
 * 
 * For examples, check TSE Octavian - https://github.com/TritonSE/TSE-Oktavian/blob/main/backend/services/errors.js
 */

// Errors for Job
export const Error = (status, code, message) => ({
    status: status,
    code: code,
    message: message
});

export const INVALID_JOB_RECEIVED = 0;
export const JOB_NOT_FOUND = 1;
