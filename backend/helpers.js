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