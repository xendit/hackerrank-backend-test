import { StandardError } from 'src/util/standard-error';
import { ErrorCodeMap } from 'src/util/errors';

export class ErrorService {
    // eslint-disable-next-line class-methods-use-this
    public generateError(httpCode: number): [StandardError, string] {
        const possibleErrorCodes = Object.keys(ErrorCodeMap).filter((errCd) => ErrorCodeMap[errCd] === httpCode);
        if (possibleErrorCodes.length === 0) {
            return [null, 'Please request with 400 or 403 or 422 or 500 to get an error!'];
        }

        const errorCode = possibleErrorCodes[Math.floor(Math.random() * possibleErrorCodes.length)];
        const err = new StandardError(errorCode, `Example error for ${httpCode} HTTP status code`);
        return [err, null];
    }
}
