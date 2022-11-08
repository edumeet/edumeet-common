"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const debug_1 = require("debug");
const APP_NAME = 'edumeet';
class Logger {
    #debug;
    #warn;
    #error;
    constructor(prefix) {
        if (prefix) {
            this.#debug = (0, debug_1.default)(`${process.title ?? APP_NAME}:DEBUG:${prefix}`);
            this.#warn = (0, debug_1.default)(`${process.title ?? APP_NAME}:WARN:${prefix}`);
            this.#error = (0, debug_1.default)(`${process.title ?? APP_NAME}:ERROR:${prefix}`);
        }
        else {
            this.#debug = (0, debug_1.default)(`${process.title ?? APP_NAME}:DEBUG`);
            this.#warn = (0, debug_1.default)(`${process.title ?? APP_NAME}:WARN`);
            this.#error = (0, debug_1.default)(`${process.title ?? APP_NAME}:ERROR`);
        }
        /* eslint-disable no-console */
        this.#debug.log = console.info.bind(console);
        this.#warn.log = console.warn.bind(console);
        this.#error.log = console.error.bind(console);
        /* eslint-enable no-console */
    }
    get debug() {
        return this.#debug;
    }
    get warn() {
        return this.#warn;
    }
    get error() {
        return this.#error;
    }
}
exports.Logger = Logger;
