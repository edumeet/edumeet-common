"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketTimeoutError = void 0;
class SocketTimeoutError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SocketTimeoutError';
        this.stack = (new Error(message)).stack;
    }
}
exports.SocketTimeoutError = SocketTimeoutError;
