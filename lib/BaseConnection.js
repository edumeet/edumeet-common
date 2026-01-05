"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConnection = void 0;
/* eslint-disable no-unused-vars */
const events_1 = require("events");
/**
 * Base class for all connections (SocketIO/DataChannel etc.).
 */
class BaseConnection extends events_1.EventEmitter {
}
exports.BaseConnection = BaseConnection;
//# sourceMappingURL=BaseConnection.js.map