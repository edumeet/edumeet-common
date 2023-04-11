/**
 * Call the provided asynchronous function and throw an error if it takes longer than the time limit
 *
 * @param {Promise<T>} promise Promise to resolve
 * @param {number} timeout Time in milliseconds
 * @returns {Promise<T>} Wrapped promise that will throw an error if it takes longer than the time limit
 */
export declare const timeoutPromise: <T>(promise: Promise<T>, timeout: number) => Promise<T>;
