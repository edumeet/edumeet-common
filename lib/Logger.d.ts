import pino = require("pino");
export declare class Logger {
    logger: pino.Logger;
    constructor(name: string, level?: pino.Level);
    get info(): pino.LogFn;
    get error(): pino.LogFn;
    get warn(): pino.LogFn;
    get debug(): pino.LogFn;
    get trace(): pino.LogFn;
    get fatal(): pino.LogFn;
}
