"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
/* eslint-enable no-unused-vars */
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
    const get = (id) => items.find((i) => i.id === id || i.pid === id);
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
//# sourceMappingURL=List.js.map