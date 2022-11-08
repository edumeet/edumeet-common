export declare type List<T extends {
    id: string;
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
/**
 * A list of items that can be added to, removed from, and iterated over.
 *
 * @param {T} initialItems - The initial items to add to the list.
 * @returns {List<T>} The list of items.
 * @template T - The type of items in the list.
 */
export declare const List: <T extends {
    id: string;
}>(...initialItems: T[]) => List<T>;
