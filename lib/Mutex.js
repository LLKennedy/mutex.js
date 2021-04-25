"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutex = void 0;
class Mutex {
    constructor() {
        this.current = Promise.resolve();
    }
    async Run(codeToRun) {
        const next = async () => {
            return codeToRun();
        };
        return await this.RunAsync(next);
    }
    async RunAsync(codeToRun) {
        return await new Promise((resolve, reject) => {
            this.current = this.current.then(async () => {
                try {
                    let t = await codeToRun();
                    resolve(t);
                }
                catch (err) {
                    reject(err);
                }
            }).catch(() => {
                // This is impossible, the code above is the only thing that can be in the promise we're waiting on.
                throw new Error("mutex in impossible state");
            });
        });
    }
}
exports.Mutex = Mutex;
//# sourceMappingURL=Mutex.js.map