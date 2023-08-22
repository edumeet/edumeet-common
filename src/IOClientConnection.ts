import { BaseConnection } from './BaseConnection';
import { SocketMessage } from './SignalingInterface';
import { io, Socket } from 'socket.io-client';
import { Logger } from './Logger';
import { SocketTimeoutError } from './SocketTimeoutError';
import { skipIfClosed } from './decorators';

interface ClientServerEvents {
	/* eslint-disable no-unused-vars */
	notification: (notification: SocketMessage) => void;
	request: (request: SocketMessage, result: (
		serverError: unknown | null,
		responseData: unknown) => void
	) => void;
	/* eslint-enable no-unused-vars */
}

interface ServerClientEvents {
	/* eslint-disable no-unused-vars */
	notification: (notification: SocketMessage) => void;
	request: (request: SocketMessage, result: (
		timeout: Error | null,
		serverError: unknown | null,
		responseData: unknown) => void
	) => void;
	/* eslint-enable no-unused-vars */
}

const logger = new Logger('SocketIOConnection');

export class IOClientConnection extends BaseConnection {
	public static create({ url }: { url: string}): IOClientConnection {
		logger.debug('create() [url:%s]', url);
	
		const socket = io(url, {
			transports: [ 'websocket', 'polling' ],
			rejectUnauthorized: false,
			closeOnBeforeunload: false,
		});
	
		return new IOClientConnection(socket);
	}

	public closed = false;
	private socket: Socket<ClientServerEvents, ServerClientEvents>;

	constructor(socket: Socket<ClientServerEvents, ServerClientEvents>) {
		super();

		logger.debug('constructor()');

		this.socket = socket;
		this.handleSocket();
	}

	@skipIfClosed
	public close(): void {
		logger.debug('close() [id: %s]', this.id);

		this.closed = true;

		if (this.socket.connected)
			this.socket.disconnect();

		this.socket.removeAllListeners();

		this.emit('close');
	}

	public get id(): string {
		return this.socket.id;
	}

	@skipIfClosed
	public notify(notification: SocketMessage): void {
		logger.debug('notification() [notification: %o]', notification);

		this.socket.emit('notification', notification);
	}

	@skipIfClosed
	private sendRequestOnWire(socketMessage: SocketMessage): Promise<unknown> {
		return new Promise((resolve, reject) => {
			if (!this.socket) {
				reject('No socket connection');
			} else {
				this.socket.timeout(3000).emit('request', socketMessage, (timeout, serverError, response) => {
					if (timeout) reject(new SocketTimeoutError('Request timed out'));
					else if (serverError) reject(serverError);
					else resolve(response);
				});
			}
		});
	}

	@skipIfClosed
	public async request(request: SocketMessage): Promise<unknown> {
		logger.debug('sendRequest() [request: %o]', request);

		for (let tries = 0; tries < 3; tries++) {
			try {
				return await this.sendRequestOnWire(request);
			} catch (error) {
				if (error instanceof SocketTimeoutError)
					logger.warn('sendRequest() timeout, retrying [attempt: %s]', tries);
				else
					throw error;
			}
		}
	}

	private handleSocket(): void {
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

			this.emit(
				'request',
				request,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(response: any) => result(null, response),
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(error: any) => result(error, null)
			);
		});

		// Listen and re-transmit events from manager.
		this.socket.io.on("error", (error: Error) => {
			this.emit("error", (error))
		})
		this.socket.io.on("reconnect_attempt", (attempt: number) => {
			this.emit("reconnect_attempt", (attempt))
		})
		this.socket.io.on("reconnect_error", (error: Error) => {
			this.emit("reconnect_error", (error))
		})
	}
}