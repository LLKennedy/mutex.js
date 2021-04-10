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
            this.current = this.current.finally(async () => {
                try {
                    let t = await codeToRun();
                    resolve(t);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
}
exports.Mutex = Mutex;
//# sourceMappingURL=Mutex.js.map