import { BaseConnection } from './BaseConnection';
import { SocketMessage } from './SignalingInterface';
import { Socket } from 'socket.io';
interface ClientServerEvents {
    notification: (notification: SocketMessage) => void;
    request: (request: SocketMessage, result: (serverError: unknown | null, responseData: unknown) => void) => void;
}
interface ServerClientEvents {
    notification: (notification: SocketMessage) => void;
    request: (request: SocketMessage, result: (timeout: Error | null, serverError: unknown | null, responseData: unknown) => void) => void;
}
export type clientAddress = {
    address: string;
    forwardedFor?: string | string[];
};
export declare class IOServerConnection extends BaseConnection {
    closed: boolean;
    private socket;
    constructor(socket: Socket<ClientServerEvents, ServerClientEvents>);
    close(): void;
    get id(): string;
    get address(): clientAddress;
    notify(notification: SocketMessage): void;
    private sendRequestOnWire;
    request(request: SocketMessage): Promise<unknown>;
    private handleSocket;
}
export {};
