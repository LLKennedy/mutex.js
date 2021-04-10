export declare type SafeAction<T> = () => T;
export declare type SafeActionAsync<T> = () => Promise<T>;
export interface IMutex {
    Run<T>(codeToRun: SafeAction<T>): Promise<T>;
    RunAsync<T>(codeToRun: SafeActionAsync<T>): Promise<T>;
}
export declare class Mutex implements IMutex {
    private current;
    Run<T>(codeToRun: SafeAction<T>): Promise<T>;
    RunAsync<T>(codeToRun: SafeActionAsync<T>): Promise<T>;
}
//# sourceMappingURL=Mutex.d.ts.map