"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipeline = void 0;
const Pipeline = (...middlewares) => {
    const stack = [...middlewares];
    const use = (...newMiddlewares) => {
        stack.push(...newMiddlewares);
    };
    const remove = (middleware) => {
        const index = stack.indexOf(middleware);
        if (index > -1)
            stack.splice(index, 1);
    };
    const execute = async (context) => {
        let prevIndex = -1;
        const runner = async (index) => {
            if (index === prevIndex)
                throw new Error('next() called multiple times');
            prevIndex = index;
            const middleware = stack[index];
            if (middleware)
                await middleware(context, () => runner(index + 1));
        };
        await runner(0);
    };
    return { use, remove, execute };
};
exports.Pipeline = Pipeline;
