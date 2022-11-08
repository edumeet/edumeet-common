"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    const execute = (context) => __awaiter(void 0, void 0, void 0, function* () {
        let prevIndex = -1;
        const runner = (index) => __awaiter(void 0, void 0, void 0, function* () {
            if (index === prevIndex)
                throw new Error('next() called multiple times');
            prevIndex = index;
            const middleware = stack[index];
            if (middleware)
                yield middleware(context, () => runner(index + 1));
        });
        yield runner(0);
    });
    return { use, remove, execute };
};
exports.Pipeline = Pipeline;
