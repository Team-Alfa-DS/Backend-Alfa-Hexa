export class Result<T> {
    private value?: T;
    private error?: Error;
    // private statusCode?: number;
    // private message?: string;

    private constructor(value: T, error: Error) {
        this.value = value;
        this.error = error;
        // this.statusCode = statusCode;
        // this.message = message;
    }

    get Value(): T {
        return this.value;
    }

    get Error(): Error {
        return this.error;
    }

    // get StatusCode(): number {
    //     return this.statusCode;
    // }

    get isSuccess(): boolean {
        return !this.error;
    }

    // get Message(): string {
    //     if (this.message) {
    //         return this.message
    //     }
    //     throw new Error('El mensaje no existe');
    // }

    static success<T>(value: T): Result<T> {
        return new Result<T>(value, null);
    }

    static fail<T>(error: Error) {
        return new Result<T>(null, error);
    }
}