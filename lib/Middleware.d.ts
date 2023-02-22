export declare type Next = () => Promise<void> | void;
export declare type Middleware<T> = (context: T, next: Next) => Promise<void> | void;
export declare type Pipeline<T> = {
    use: (...middlewares: Middleware<T>[]) => void;
    remove: (middleware: Middleware<T>) => void;
    execute: (context: T) => Promise<void | T>;
};
export declare const Pipeline: <T>(...middlewares: Middleware<T>[]) => Pipeline<T>;
