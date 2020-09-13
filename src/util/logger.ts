const isTestEnv = process.env.NODE_ENV === 'test';

export const logger = {
    info: (context: any, message?: string) => {
        if (!isTestEnv) console.log(context, message);
    },
    warn: (context: any, message?: string) => {
        if (!isTestEnv) console.log(context, message);
    },
    error: (err: Error, message?: string) => {
        if (!isTestEnv) console.error(err, message);
    }
};
