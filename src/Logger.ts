import pino from 'pino';

export class Logger {
	public logger: pino.Logger;

	constructor(name: string, level: pino.Level = 'info') {
		this.logger = pino({ name, level });
	}

	get info(): pino.LogFn {
		return this.logger.info.bind(this.logger);
	}

	get error(): pino.LogFn {
		return this.logger.error.bind(this.logger);
	}

	get warn(): pino.LogFn {
		return this.logger.warn.bind(this.logger);
	}

	get debug(): pino.LogFn {
		return this.logger.debug.bind(this.logger);
	}

	get trace(): pino.LogFn {
		return this.logger.trace.bind(this.logger);
	}

	get fatal(): pino.LogFn {
		return this.logger.fatal.bind(this.logger);
	}
}
