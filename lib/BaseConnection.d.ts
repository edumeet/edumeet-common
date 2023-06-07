/// <reference types="node" />
import { EventEmitter } from 'events';
import { SignalingInterface, SocketMessage } from './SignalingInterface';
export type InboundNotification = (notification: SocketMessage) => void;
export type InboundRequest = (request: SocketMessage, respond: (response: any) => void, reject: (error: any) => void) => void;
export declare interface BaseConnection {
    on(event: 'close', listener: () => void): this;
    on(event: 'connect', listener: () => void): this;
    on(event: 'reconnect', listener: () => void): this;
    on(event: 'notification', listener: InboundNotification): this;
    on(event: 'request', listener: InboundRequest): this;
}
/**
 * Base class for all connections (SocketIO/DataChannel etc.).
 */
export declare abstract class BaseConnection extends EventEmitter implements SignalingInterface {
    abstract notify(notification: SocketMessage): void;
    abstract request(request: SocketMessage): Promise<unknown>;
    abstract close(): void;
    abstract get id(): string;
}
