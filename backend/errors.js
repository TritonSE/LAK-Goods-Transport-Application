/**
 * Please add all errors here.
 */

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
      message = `ERROR: Type ${this.constructor.name}, Code ${
        this.code
      }, CONTEXT - ${
        this.context.length ? `\n${this.context.join('\n\n')}` : null
      }`;
    }
    return message;
  }
}

/**
 * Validation Error contains errors that appear while validating client inputs
 */
const INVALID_OBJECT_ID_RECEIVED_MSG =
  'Invalid ID was found, ID must be a string of 12 bytes or a string of 24 hex characters';
const INVALID_BOOLEAN_VALUE_MSG =
  'Invalid boolean value was found in the request, expected true/false';
const USER_NOT_IN_SESSION_MSG = 'No user found in session';
const INVALID_PAGINATION_INPUT = 'Incorrect pagination values received';
export class ValidationError extends CustomError {
  static INVALID_OBJECT_ID = new ValidationError(
    0,
    400,
    INVALID_OBJECT_ID_RECEIVED_MSG
  );

  static INVALID_BOOLEAN_VALUE = new ValidationError(
    1,
    400,
    INVALID_BOOLEAN_VALUE_MSG
  );

  static USER_NOT_IN_SESSION = new ValidationError(
    2,
    400,
    USER_NOT_IN_SESSION_MSG
  );

  static INVALID_PAGINATION_INPUT = new ValidationError(
    3,
    400,
    INVALID_PAGINATION_INPUT
  );
}

/**
 * ServiceError are errors which appear while processing the client's request
 */
const INVALID_JOB_RECEIVED_MSG =
  'Invalid job payload was received, please make sure to have all required job fields';
const JOB_NOT_FOUND_MSG = 'Job ID you specified does not exist';
const IMAGE_NOT_FOUND_MSG =
  'Image ID you specified does not exist, please check job for latest image IDs';
const JOB_EDIT_PERMISSION_DENIED_MSG =
  'You do not have the right permissions to edit the requested job';
const DUPLICATE_JOB_APPLICATION_ATTEMPTED_MSG =
  'You have already applied for the job, multiple applications not allowed';
const DRIVER_ALREADY_ASSIGNED_MSG =
  'Driver is already assigned for this job, please repost the job to assign a new driver';
const DRIVER_MUST_BE_APPLICANT_MSG =
  'Driver must be an applicant to be assigned as driver';
const DRIVER_NOT_ASSIGNED_MSG =
  'Driver not assigned for the job but was expected to be assigned';
const JOB_CLOSED_FOR_APPLICATION_MSG = 'Job has been closed for applications';
const USER_NOT_FOUND_MSG = 'User was not found';
const MUST_DENY_APPLICANT_MSG = 'Must deny an existing applicant';
const INVALID_USER_RECEIVED_MSG =
  'Invalid user payload was received, please make sure to have all required fields';

export class ServiceError extends CustomError {
  static INVALID_JOB_RECEIVED = new ServiceError(
    0,
    400,
    INVALID_JOB_RECEIVED_MSG
  );

  static JOB_NOT_FOUND = new ServiceError(1, 404, JOB_NOT_FOUND_MSG);

  static JOB_EDIT_PERMISSION_DENIED = new ServiceError(
    2,
    403,
    JOB_EDIT_PERMISSION_DENIED_MSG
  );

  static INVALID_JOB_UPDATE = new ServiceError(
    3,
    400,
    INVALID_JOB_RECEIVED_MSG
  );

  static IMAGE_NOT_FOUND = new ServiceError(4, 404, IMAGE_NOT_FOUND_MSG);

  static DUPLICATE_JOB_APPLICATION_ATTEMPTED = new ServiceError(
    5,
    403,
    DUPLICATE_JOB_APPLICATION_ATTEMPTED_MSG
  );

  static DRIVER_ALREADY_ASSIGNED = new ServiceError(
    6,
    409,
    DRIVER_ALREADY_ASSIGNED_MSG
  );

  static DRIVER_MUST_BE_APPLICANT = new ServiceError(
    7,
    403,
    DRIVER_MUST_BE_APPLICANT_MSG
  );

  static DRIVER_NOT_ASSIGNED = new ServiceError(
    8,
    409,
    DRIVER_NOT_ASSIGNED_MSG
  );

  static JOB_CLOSED_FOR_APPLICATION = new ServiceError(
    9,
    409,
    JOB_CLOSED_FOR_APPLICATION_MSG
  );

  static USER_NOT_FOUND = new ServiceError(10, 404, USER_NOT_FOUND_MSG);

  static MUST_DENY_APPLICANT = new ServiceError(
    11,
    403,
    MUST_DENY_APPLICANT_MSG
  );

  static INVALID_USER_RECEIVED = new ServiceError(
    11,
    400,
    INVALID_USER_RECEIVED_MSG
  );
}

/**
 * InternalError are those that are not relevant to the client
 */
const INTERNAL_ERROR_MSG = 'An internal server error occured';
export class InternalError extends CustomError {
  static IMAGE_UPLOAD_ERROR = new InternalError(0);

  static IMAGE_DELETE_ERROR = new InternalError(1);

  static JOB_DELETE_ERROR = new InternalError(2);

  static USER_NOT_FOUND = new InternalError(3, 404);

  static DOCUMENT_UPLOAD_ERROR = new InternalError(4);

  static UNKNOWN = new InternalError(5); // for any unknown error

  static OTHER = new InternalError(6); // for all known errors, not belonging to the above categories

  constructor(code, status, message) {
    super(code, status, message);
    if (!status) this.status = 500;
    if (!message) this.message = INTERNAL_ERROR_MSG;
  }
}
