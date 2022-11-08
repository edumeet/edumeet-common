export declare type List<T extends {
    id?: string;
    pid?: number;
}> = {
    add: (...items: T[]) => number;
    moveFirst: (item: T) => void;
    has: (item: T) => boolean;
    get: (id: string | number) => T | undefined;
    clear: () => number;
    remove: (item: T) => boolean;
    items: T[];
    length: number;
    empty: boolean;
};
export declare const List: <T extends {
    id?: string;
    pid?: number;
}>(...initialItems: T[]) => List<T>;
