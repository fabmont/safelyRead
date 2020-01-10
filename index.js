const loGet = require('lodash.get');

/**
 * @function safelyRead
 * @param  {Object} target Target object
 * @param  {Array<String>} path Path to try to access
 * @param  {Any} fallback Fallback if access fails
 * @param {Function} transform Value or fallback
 * @return {Any} Value or fallback
 */
function safelyRead(target, path, fallback = null, transform) {
  const onDevelopment = process.env.NODE_ENV === 'development';
  const result = loGet(target, path, fallback);

  if (result && result !== fallback) {
    if (transform && typeof transform === 'function') {
      try {
        return transform(result);
      } catch (error) {
        if (onDevelopment) {
          console.error(
            `The function passed to the fourth parameter of safelyRead crashed.
            check it out for a better execution.`,
          );
        }
      }
    }
    return result;
  }

  return fallback;
}

module.exports = safelyRead;
