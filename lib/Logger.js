"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const pino_1 = require("pino");
class Logger {
    constructor(name, level = 'info') {
        this.logger = (0, pino_1.default)({ name, level });
    }
    get info() {
        return this.logger.info.bind(this.logger);
    }
    get error() {
        return this.logger.error.bind(this.logger);
    }
    get warn() {
        return this.logger.warn.bind(this.logger);
    }
    get debug() {
        return this.logger.debug.bind(this.logger);
    }
    get trace() {
        return this.logger.trace.bind(this.logger);
    }
    get fatal() {
        return this.logger.fatal.bind(this.logger);
    }
}
exports.Logger = Logger;
