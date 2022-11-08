"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
/* eslint-enable no-unused-vars */
/**
 * A list of items that can be added to, removed from, and iterated over.
 *
 * @param {T} initialItems - The initial items to add to the list.
 * @returns {List<T>} The list of items.
 * @template T - The type of items in the list.
 */
const List = (...initialItems) => {
    const items = [...initialItems];
    const add = (...newItems) => items.push(...newItems);
    const moveFirst = (item) => {
        const index = items.indexOf(item);
        if (index > 0) {
            items.splice(index, 1);
            items.unshift(item);
        }
    };
    const has = (item) => items.includes(item);
    const get = (id) => items.find((i) => i.id === id);
    const clear = () => (items.length = 0);
    const remove = (item) => {
        const index = items.indexOf(item);
        if (index > -1) {
            items.splice(index, 1);
            return true;
        }
        return false;
    };
    return {
        add,
        moveFirst,
        has,
        get,
        clear,
        remove,
        items,
        get length() {
            return items.length;
        },
        get empty() {
            return items.length === 0;
        }
    };
};
exports.List = List;
