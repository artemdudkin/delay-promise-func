const promisify = require('promisify-func');

/** Waits a bit and then call function
 *
 * @param {Function} func - function to call
 * @param {number} delay - delay in milliseconds
 *
 * @returns Promise
 */
const delayed = (func, delay) => {
    return (...rest) => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(promisify(func).apply(this, rest));
            }, delay);
        })
    }
}

module.exports = delayed;
