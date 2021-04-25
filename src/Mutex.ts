export type SafeAction<T> = () => T;
export type SafeActionAsync<T> = () => Promise<T>;

export interface IMutex {
	Run<T>(codeToRun: SafeAction<T>): Promise<T>;
	RunAsync<T>(codeToRun: SafeActionAsync<T>): Promise<T>;
}

export class Mutex implements IMutex {
	private current: Promise<void> = Promise.resolve();
	public async Run<T>(codeToRun: SafeAction<T>): Promise<T> {
		const next = async () => {
			return codeToRun();
		}
		return await this.RunAsync(next);
	}
	public async RunAsync<T>(codeToRun: SafeActionAsync<T>): Promise<T> {
		return await new Promise<T>((resolve, reject) => {
			this.current = this.current.then(async () => {
				try {
					let t = await codeToRun();
					resolve(t);
				} catch (err) {
					reject(err);
				}
			}).catch(() => {
				// This is impossible, the code above is the only thing that can be in the promise we're waiting on.
				throw new Error("mutex in impossible state");
			})
		})
	}
}