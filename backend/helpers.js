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
 * Returns a new object from payload containing only fields specified in allowedFields
 * @param {*} payload 
 * @param {*} allowedFields 
 * @returns {object} filtered object
 */
export function filterUpdatePayload(payload, allowedFields) {
    const filtered = {}  
    allowedFields.forEach(field => {
      if (field in payload) filtered[field] = payload[field];
    });
    return filtered;
}