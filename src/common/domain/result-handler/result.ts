export class Result<T> {
    private value?: T;
    private error?: Error;
    private statusCode?: number;
    private message?: string;

    private constructor(value: T, error: Error, statusCode: number, message: string) {
        this.value = value;
        this.error = error;
        this.statusCode = statusCode;
        this.message = message;
    }

    get Value(): T {
        return this.value;
    }

    get Error(): Error {
        return this.error;
    }

    get StatusCode(): number {
        return this.statusCode;
    }

    get isSuccess(): boolean {
        return !this.error;
    }

    static success<T>(value: T, statusCode: number): Result<T> {
        return new Result<T>(value, null, statusCode, null);
    }

    static fail<T>(error: Error, statusCode: number, message: string) {
        return new Result<T>(null, error, statusCode, message);
    }
}