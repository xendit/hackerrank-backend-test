import { Router } from 'express';

export class HealthcheckController {
    private router: Router;

    constructor() {
        this.router = Router();
    }

    getRouter() {
        return this.router;
    }
}
