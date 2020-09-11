export class StandardError extends Error {
    public error_code: string;

    public lastError?: object | null;

    public context?: object | null;

    constructor(errorCode: string, message: string, lastError?: object | null, context?: object | null) {
        super(message);

        // So you can do typeof CustomError
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = this.constructor.name;
        this.error_code = errorCode;
        this.lastError = lastError;
        this.context = context;
    }
}
