import { BaseConnection } from './BaseConnection';
import { SocketMessage } from './SignalingInterface';
import { Socket } from 'socket.io-client';
interface ClientServerEvents {
    notification: (notification: SocketMessage) => void;
    request: (request: SocketMessage, result: (serverError: unknown | null, responseData: unknown) => void) => void;
}
interface ServerClientEvents {
    notification: (notification: SocketMessage) => void;
    request: (request: SocketMessage, result: (timeout: Error | null, serverError: unknown | null, responseData: unknown) => void) => void;
}
export declare class IOClientConnection extends BaseConnection {
    static create({ url }: {
        url: string;
    }): IOClientConnection;
    closed: boolean;
    private socket;
    constructor(socket: Socket<ClientServerEvents, ServerClientEvents>);
    close(): void;
    get id(): string;
    notify(notification: SocketMessage): void;
    private sendRequestOnWire;
    request(request: SocketMessage): Promise<unknown>;
    private handleSocket;
}
export {};
