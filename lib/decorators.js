"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipIfClosed = void 0;
/**
 * Decorator to add to a class method to skip the method if
 * the class instance has a closed value of true.
 *
 * @param {unknown} target - The class instance
 * @param {string} propertyKey - The name of the method
 * @param {PropertyDescriptor} descriptor - The descriptor of the method
 * @returns {any} The result of the method if the class instance is not closed.
 */
const skipIfClosed = (target, propertyKey, descriptor
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => {
    const originalValue = descriptor.value;
    descriptor.value = function (...args) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this?.closed)
            return;
        return originalValue.apply(this, args);
    };
};
exports.skipIfClosed = skipIfClosed;
