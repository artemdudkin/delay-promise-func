/** Waits a bit and then call function
 *
 * @param {Function} func - function to call
 * @param {number} delay - delay in milliseconds
 *
 * @returns Promise
 */
const deferred = (func, delay) => {
    return (...rest) => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                let res;
                let err;
                try {
                    res = func.apply(this, rest);
                } catch (e) {
                    err = e;
                }
                if (err) {
                    reject(err);
                } else {
                    if (typeof res.then != 'function') {
                        resolve( res );
                    } else {
                        res
                        .then(res=>{
                            resolve(res);
                        })
                        .catch(err=>{
                            reject(err);
                        })
                    }
                }
            }, delay);
        })
    }
}

module.exports = deferred;
