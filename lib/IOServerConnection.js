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
exports.IOServerConnection = void 0;
const BaseConnection_1 = require("./BaseConnection");
const SocketTimeoutError_1 = require("./SocketTimeoutError");
const decorators_1 = require("./decorators");
const Logger_1 = require("./Logger");
const logger = new Logger_1.Logger('SocketIOConnection');
class IOServerConnection extends BaseConnection_1.BaseConnection {
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
            this.socket.disconnect(true);
        this.socket.removeAllListeners();
        this.emit('close');
    }
    get id() {
        return this.socket.id;
    }
    get address() {
        const address = {
            address: this.socket.handshake.address,
            forwardedFor: this.socket.headers.handshake.headers['x-forwarded-for']
        };
        return address;
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
        // TODO: reconnect logic here
        this.socket.once('disconnect', () => {
            logger.debug('socket disconnected');
            this.close();
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
    }
}
__decorate([
    decorators_1.skipIfClosed
], IOServerConnection.prototype, "close", null);
__decorate([
    decorators_1.skipIfClosed
], IOServerConnection.prototype, "notify", null);
__decorate([
    decorators_1.skipIfClosed
], IOServerConnection.prototype, "sendRequestOnWire", null);
__decorate([
    decorators_1.skipIfClosed
], IOServerConnection.prototype, "request", null);
exports.IOServerConnection = IOServerConnection;
