"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeoutPromise = void 0;
/**
 * Call the provided asynchronous function and throw an error if it takes longer than the time limit
 *
 * @param {Promise<T>} promise Promise to resolve
 * @param {number} timeout Time in milliseconds
 * @returns {Promise<T>} Wrapped promise that will throw an error if it takes longer than the time limit
 */
const timeoutPromise = (promise, timeout) => __awaiter(void 0, void 0, void 0, function* () {
    let timeoutHandle;
    const timeoutPromise = new Promise((_, reject) => timeoutHandle = setTimeout(() => reject(new Error('Promise timed out')), timeout));
    return Promise.race([promise, timeoutPromise]).then((result) => {
        clearTimeout(timeoutHandle);
        return result;
    });
});
exports.timeoutPromise = timeoutPromise;
