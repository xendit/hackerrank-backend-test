export const logger = {
    info: (context: any, message?: string) => console.log(context, message),
    warn: (context: any, message?: string) => console.log(context, message),
    error: (err: Error, message?: string) => console.error(err, message)
};
