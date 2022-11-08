export interface SocketMessage {
    method: string;
    data?: any;
}
/**
 * Interface for any signaling class.
 */
export interface SignalingInterface {
    notify: (notification: SocketMessage) => void;
    request: (request: SocketMessage) => Promise<unknown>;
    close: () => void;
}
