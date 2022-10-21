import { ValidationError } from "./errors";
import mongoose from "mongoose";

/**
 * Validates whether a string is true/false and returns its value. Otherwise, returns null
 * @param {string} str 
 * @returns {boolean}
 */
export const stringToBoolean = (str) => {
    if (!str) return null;
    else if (str.toLowerCase() === 'true') return true;
    else if (str.toLowerCase() === 'false') return false;
    else return null;
}

export const stringToBooleanAllowNull = (str) => {
  const bool = stringToBoolean(str)
  if (bool == null && str == null) {
    return false;
  }
  return bool;
}

/**
 * Returns a new `object` from existing one containing only fields specified in `fields`
 * @param {*} object 
 * @param {*} fields 
 * @returns {object} filtered object
 */
export function filterObject(object, fields) {
    const filtered = {}  
    fields.forEach(field => {
      if (field in object) filtered[field] = object[field];
    });
    return filtered;
}


/**
 * Validates an ID as a mongoDB Object ID and returns it if true. Otherwise throws an error
 * @param {str} id 
 * @returns 
 */
export const validateId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
      throw ValidationError.INVALID_OBJECT_ID;
  };
  return mongoose.Types.ObjectId(id);
}