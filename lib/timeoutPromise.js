"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeoutPromise = void 0;
/**
 * Call the provided asynchronous function and throw an error if it takes longer than the time limit
 *
 * @param {Promise<T>} promise Promise to resolve
 * @param {number} timeout Time in milliseconds
 * @returns {Promise<T>} Wrapped promise that will throw an error if it takes longer than the time limit
 */
const timeoutPromise = async (promise, timeout) => {
    let timeoutHandle;
    const timeoutPromise = new Promise((_, reject) => timeoutHandle = setTimeout(() => reject(new Error('Promise timed out')), timeout));
    return Promise.race([promise, timeoutPromise]).then((result) => {
        clearTimeout(timeoutHandle);
        return result;
    });
};
exports.timeoutPromise = timeoutPromise;
//# sourceMappingURL=timeoutPromise.js.map