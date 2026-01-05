"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const pino = require("pino");
class Logger {
    constructor(name, level = process.env.LOG_LEVEL || 'info') {
        this.logger = pino({ name, level });
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
//# sourceMappingURL=Logger.js.map