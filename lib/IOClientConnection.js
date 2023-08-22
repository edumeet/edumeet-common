"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.IOClientConnection = void 0;
const BaseConnection_1 = require("./BaseConnection");
const socket_io_client_1 = require("socket.io-client");
const Logger_1 = require("./Logger");
const SocketTimeoutError_1 = require("./SocketTimeoutError");
const decorators_1 = require("./decorators");
const logger = new Logger_1.Logger('SocketIOConnection');
class IOClientConnection extends BaseConnection_1.BaseConnection {
    static create({ url }) {
        logger.debug('create() [url:%s]', url);
        const socket = (0, socket_io_client_1.io)(url, {
            transports: ['websocket', 'polling'],
            rejectUnauthorized: false,
            closeOnBeforeunload: false,
        });
        return new IOClientConnection(socket);
    }
    constructor(socket) {
        super();
        this.closed = false;
        logger.debug('constructor()');
        this.socket = socket;
        this.handleSocket();
    }
    close() {
        logger.debug('close() [id: %s]', this.id);
        this.closed = true;
        if (this.socket.connected)
            this.socket.disconnect();
        this.socket.removeAllListeners();
        this.emit('close');
    }
    get id() {
        return this.socket.id;
    }
    notify(notification) {
        logger.debug('notification() [notification: %o]', notification);
        this.socket.emit('notification', notification);
    }
    sendRequestOnWire(socketMessage) {
        return new Promise((resolve, reject) => {
            if (!this.socket) {
                reject('No socket connection');
            }
            else {
                this.socket.timeout(3000).emit('request', socketMessage, (timeout, serverError, response) => {
                    if (timeout)
                        reject(new SocketTimeoutError_1.SocketTimeoutError('Request timed out'));
                    else if (serverError)
                        reject(serverError);
                    else
                        resolve(response);
                });
            }
        });
    }
    request(request) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug('sendRequest() [request: %o]', request);
            for (let tries = 0; tries < 3; tries++) {
                try {
                    return yield this.sendRequestOnWire(request);
                }
                catch (error) {
                    if (error instanceof SocketTimeoutError_1.SocketTimeoutError)
                        logger.warn('sendRequest() timeout, retrying [attempt: %s]', tries);
                    else
                        throw error;
                }
            }
        });
    }
    handleSocket() {
        logger.debug('handleSocket()');
        this.socket.on('connect', () => {
            logger.debug('handleSocket() connected');
            this.emit('connect');
        });
        this.socket.once('disconnect', (reason) => {
            logger.debug('socket disconnected');
            if (reason === 'io server disconnect')
                this.close();
            else
                this.emit('reconnect');
        });
        this.socket.on('notification', (notification) => {
            logger.debug('"notification" event [notification: %o]', notification);
            this.emit('notification', notification);
        });
        this.socket.on('request', (request, result) => {
            logger.debug('"request" event [request: %o]', request);
            this.emit('request', request, 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (response) => result(null, response), 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (error) => result(error, null));
        });
        // Listen and re-transmit events from manager.
        // this.socket.io.on("error", (error: Error) => {
        // 	this.emit("error", (error))
        // })
        // this.socket.io.on("reconnect_attempt", (attempt: number) => {
        // 	this.emit("reconnect_attempt", (attempt))
        // })
        // this.socket.io.on("reconnect_error", (error: Error) => {
        // 	this.emit("reconnect_error", (error))
        // })
    }
}
__decorate([
    decorators_1.skipIfClosed
], IOClientConnection.prototype, "close", null);
__decorate([
    decorators_1.skipIfClosed
], IOClientConnection.prototype, "notify", null);
__decorate([
    decorators_1.skipIfClosed
], IOClientConnection.prototype, "sendRequestOnWire", null);
__decorate([
    decorators_1.skipIfClosed
], IOClientConnection.prototype, "request", null);
exports.IOClientConnection = IOClientConnection;
