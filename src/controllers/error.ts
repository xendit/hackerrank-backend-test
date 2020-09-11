import { Router, Request, Response } from 'express';
import { StandardError } from 'src/util/standard-error';

export interface IErrorService {
    generateError(httpCode: number): [StandardError, string];
}

export class ErrorController {
    private readonly errorService: IErrorService;

    private router: Router;

    public constructor(errorService: IErrorService) {
        this.errorService = errorService;
        this.router = Router();
        this.router.get('/:http_code', this.getError.bind(this));
    }

    getRouter() {
        return this.router;
    }

    private getError(req: Request, res: Response) {
        const { httpCode } = req.params;
        const code = parseInt(httpCode, 10);
        const [err, instructionMsg] = this.errorService.generateError(code);
        if (err) {
            throw err;
        }

        return res.status(200).json({ message: instructionMsg });
    }
}
