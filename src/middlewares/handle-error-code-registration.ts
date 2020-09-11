import { Request, Response, NextFunction } from 'express';

export type ErrorCodeMap = { [errorCode: string]: number };

export const errorCodeHandler = (ecm: ErrorCodeMap) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        res.locals.errorCodeMap = ecm;

        return next();
    };
};
