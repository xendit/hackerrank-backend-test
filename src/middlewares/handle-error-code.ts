import { Request, NextFunction, Response } from 'express';
import _ from 'lodash';
import { logger } from 'src/util/logger';
import { ErrorCodeMap, ErrorCodes } from 'src/util/errors';
import { ValidationError } from '../util/openapi-validator';

export const errorHandler = () => {
    // This is an express error handler, need to the 4 variable signature
    // eslint-disable-next-line
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        if ((err as ValidationError).status) {
            logger.info({ err }, 'Validation Error');
            return res.status(err.status).json({
                message: err.message,
                error_code: err.error_code || ErrorCodes.API_VALIDATION_ERROR,
                errors: err.errors
            });
        }

        const statusCode = ErrorCodeMap[err.error_code];

        if (_.isNumber(statusCode)) {
            const logContext = {
                error_code: err.error_code,
                status_code: statusCode,
                context: err.context
            };

            // _.defaults(logContext, req.safeLoggingRequestData); // to be determined what is this for

            logger.info(logContext, 'API error');

            return res.status(statusCode).send({
                error_code: err.error_code,
                message: err.message
            });
        }

        logger.error(err, 'unexpected error');

        return res.status(500).send({
            error_code: 'SERVER_ERROR',
            message: 'Something unexpected happened, we are investigating this issue right now'
        });
    };
};
