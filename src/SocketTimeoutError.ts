export class SocketTimeoutError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'SocketTimeoutError';
		this.stack = (new Error(message)).stack;
	}
}