/**
 * Decorator to add to a class method to skip the method if
 * the class instance has a closed value of true.
 *
 * @param {unknown} target - The class instance
 * @param {string} propertyKey - The name of the method
 * @param {PropertyDescriptor} descriptor - The descriptor of the method
 * @returns {any} The result of the method if the class instance is not closed.
 */
export declare const skipIfClosed: (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => any;
