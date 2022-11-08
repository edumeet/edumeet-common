/// <reference types="node" />
export interface RawSocketMessage {
    request?: true;
    response?: true;
    notification?: true;
    id: string;
    method?: string;
    data?: unknown;
    errorReason?: string;
}
export interface SentRequest {
    id: string;
    method?: string;
    resolve: (data: unknown) => void;
    reject: (error: unknown) => void;
    timer: NodeJS.Timeout;
    close: () => void;
}
export declare class RawSocket {
    static parse(raw: string): RawSocketMessage | undefined;
    static createRequest(method: string, data: unknown): RawSocketMessage;
    static createSuccessResponse(request: RawSocketMessage, data: unknown): RawSocketMessage;
    static createErrorResponse(request: RawSocketMessage, errorReason?: string): RawSocketMessage;
    static createNotification(method: string, data: unknown): RawSocketMessage;
}
