export type Next = () => Promise<void> | void;
export type Middleware<T> = (context: T, next: Next) => Promise<void> | void;
export type Pipeline<T> = {
    use: (...middlewares: Middleware<T>[]) => void;
    remove: (middleware: Middleware<T>) => void;
    clear: () => void;
    execute: (context: T) => Promise<void | T>;
};
export declare const Pipeline: <T>(...middlewares: Middleware<T>[]) => Pipeline<T>;
