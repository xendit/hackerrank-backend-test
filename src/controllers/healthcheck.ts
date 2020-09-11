import { Request, Response, Router } from 'express';

export class HealthcheckController {
    private router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/liveness', HealthcheckController.getHealthcheckLiveness);
        this.router.get('/readiness', HealthcheckController.getHealthcheckReadiness);
    }

    getRouter() {
        return this.router;
    }

    /**
     * GET /healthcheck/liveness
     * Check whether app is up
     */
    static async getHealthcheckLiveness(_: Request, res: Response) {
        return res.status(200).json({ status: 'OK' });
    }

    /**
     * GET /healthcheck/readiness
     * Check whether app is ready to receive traffic
     */
    static async getHealthcheckReadiness(_: Request, res: Response) {
        return res.status(200).json({ status: 'OK' });
    }
}
