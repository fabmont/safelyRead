const loGet = require('lodash.get');

/**
 * @function safeRead
 * @param  {Object} target Target object
 * @param  {Array<String>} path Path to try to access
 * @param  {Any} fallback Fallback if access fails
 * @return {Function} Value or fallback
 */
function safeRead(target, path, fallback = null, transform) {
  const onDevelopment = process.env.NODE_ENV === 'development';
  console.log(onDevelopment);
  const result = loGet(target, path, fallback);

  if (result && result !== fallback) {
    if (transform && typeof transform === 'function') {
      try {
        return transform(result);
      } catch (error) {
        if (onDevelopment) {
          console.error(
            `The function passed to the fourth parameter of safeRead crashed.
            check it out for a better execution.`,
          );
        }
      }
    } else 

    return result;
  }

  return fallback;
}

module.exports = safeRead;
