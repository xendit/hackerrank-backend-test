// @CONSIDER: Deprecating this handler format
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';

export const requestHandler = (asyncHandler: <T>(req: Request) => Promise<T>, exclude: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        asyncHandler(req)
            .then((response) => {
                // load the response of the async function to res
                res.locals.response_data = response;

                return next();
            })
            .catch((err) => {
                // Enriching error context
                // eslint-disable-next-line
                err.context = {
                    ...err.context,
                    reqBody: _.omit(req.body, exclude),
                    reqIp: req.ip,
                    reqIps: req.ips,
                    reqParams: req.params,
                    reqQuery: req.query
                };
                return next(err);
            });
    };
};
