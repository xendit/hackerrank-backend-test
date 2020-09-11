import { createLogger } from '@boxbag/xsh-node-logger';

export const logger = createLogger({
    options: { prettyPrint: process.env.NODE_ENV !== 'production' }
});
