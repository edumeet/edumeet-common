"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Logger_debug, _Logger_warn, _Logger_error;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const debug_1 = require("debug");
const APP_NAME = 'edumeet';
class Logger {
    constructor(prefix) {
        _Logger_debug.set(this, void 0);
        _Logger_warn.set(this, void 0);
        _Logger_error.set(this, void 0);
        if (prefix) {
            __classPrivateFieldSet(this, _Logger_debug, (0, debug_1.default)(`${APP_NAME}:DEBUG:${prefix}`), "f");
            __classPrivateFieldSet(this, _Logger_warn, (0, debug_1.default)(`${APP_NAME}:WARN:${prefix}`), "f");
            __classPrivateFieldSet(this, _Logger_error, (0, debug_1.default)(`${APP_NAME}:ERROR:${prefix}`), "f");
        }
        else {
            __classPrivateFieldSet(this, _Logger_debug, (0, debug_1.default)(`${APP_NAME}:DEBUG`), "f");
            __classPrivateFieldSet(this, _Logger_warn, (0, debug_1.default)(`${APP_NAME}:WARN`), "f");
            __classPrivateFieldSet(this, _Logger_error, (0, debug_1.default)(`${APP_NAME}:ERROR`), "f");
        }
        /* eslint-disable no-console */
        __classPrivateFieldGet(this, _Logger_debug, "f").log = console.info.bind(console);
        __classPrivateFieldGet(this, _Logger_warn, "f").log = console.warn.bind(console);
        __classPrivateFieldGet(this, _Logger_error, "f").log = console.error.bind(console);
        /* eslint-enable no-console */
    }
    get debug() {
        return __classPrivateFieldGet(this, _Logger_debug, "f");
    }
    get warn() {
        return __classPrivateFieldGet(this, _Logger_warn, "f");
    }
    get error() {
        return __classPrivateFieldGet(this, _Logger_error, "f");
    }
}
exports.Logger = Logger;
_Logger_debug = new WeakMap(), _Logger_warn = new WeakMap(), _Logger_error = new WeakMap();
