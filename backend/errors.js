/**
 * Please add all errors here.
 * 
 * For examples, check TSE Octavian - https://github.com/TritonSE/TSE-Oktavian/blob/main/backend/services/errors.js
 */

// Error messages
export const INVALID_OBJECT_ID_RECEIVED_MSG = 'Invalid ID was found, ID must be a string of 12 bytes or a string of 24 hex characters';
export const INVALID_JOB_RECEIVED_MSG = 'Invalid job payload was received, please make sure to have all required job fields';
export const JOB_NOT_FOUND_MSG = 'Job ID you specified does not exist';
export const IMAGE_NOT_FOUND_MSG = 'Image ID you specified does not exist, please check job for latest image IDs';
export const JOB_EDIT_PERMISSION_DENIED_MSG = 'You do not have the right permissions to edit the requested job';
export const INTERNAL_ERROR_MSG = 'An internal server error occured';

/**
 * Base error class enherited by all custom errors
 */
export class CustomError {
  constructor(code, status, message) {
    this.code = code;
    this.statusCode = status;
    this.statusMessage = message;
    this.context = [];
  }

  /**
   * Adds context to the error. For example, adding stack trace of the error
   * @param {*} ctx Context for error
   * @returns this
   */
  addContext(ctx) {
    this.context.push(ctx);
    return this;
  }

  /**
   * Formats the error depending on where it is being displayed
   * @param {Boolean} clientFacing Flag which determines where error will be displayed
   * @returns Error Message
   */
  format(clientFacing) {
    let message = null;
    if (clientFacing) {
      message = `ERROR: ${this.statusMessage}`;
    } else {
      message = `ERROR: Type ${this.constructor.name}, Code ${this.code}, CONTEXT - ${this.context.length ? '\n' + this.context.join('\n\n') : null }`;
    }
    return message;
  }
}

/**
 * Validation Error contains errors that appear while validating client inputs
 */
export class ValidationError extends CustomError {
  static INVALID_OBJECT_ID = new ValidationError(0, 400, INVALID_OBJECT_ID_RECEIVED_MSG);
}

/**
 * ServiceError are errors which appear while processing the client's request
 */
export class ServiceError extends CustomError {
    static INVALID_JOB_RECEIVED = new ServiceError(0, 400, INVALID_JOB_RECEIVED_MSG)
    static JOB_NOT_FOUND = new ServiceError(1, 404, JOB_NOT_FOUND_MSG)
    static JOB_EDIT_PERMISSION_DENIED = new ServiceError(2, 403, JOB_EDIT_PERMISSION_DENIED_MSG)    
    static INVALID_JOB_UPDATE = new ServiceError(3, 400, INVALID_JOB_RECEIVED_MSG);
    static IMAGE_NOT_FOUND = new ServiceError(1, 404, IMAGE_NOT_FOUND_MSG);
}

/**
 * InternalError are those that are not relevant to the client
 */
export class InternalError extends CustomError {
  static IMAGE_UPLOAD_ERROR = new InternalError(0, 500);
  static IMAGE_DELETE_ERROR = new InternalError(1, 500);
  static JOB_DELETE_ERROR = new InternalError(2, 500);
  
  constructor(code, status, message) {
    if (!message) message = INTERNAL_ERROR_MSG;
    super(code, status, message);
  }
}