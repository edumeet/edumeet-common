"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawSocket = void 0;
const crypto_1 = require("crypto");
class RawSocket {
    static parse(raw) {
        let message;
        try {
            message = JSON.parse(raw);
        }
        catch (error) {
            return;
        }
        if (typeof message !== 'object' || Array.isArray(message))
            return;
        return message;
    }
    static createRequest(method, data) {
        return {
            request: true,
            id: (0, crypto_1.randomUUID)(),
            method: method,
            data: data ?? {}
        };
    }
    static createSuccessResponse(request, data) {
        return {
            response: true,
            id: request.id,
            data: data ?? {}
        };
    }
    static createErrorResponse(request, errorReason) {
        return {
            response: true,
            id: request.id,
            errorReason: errorReason
        };
    }
    static createNotification(method, data) {
        return {
            notification: true,
            id: (0, crypto_1.randomUUID)(),
            method: method,
            data: data || {}
        };
    }
}
exports.RawSocket = RawSocket;
