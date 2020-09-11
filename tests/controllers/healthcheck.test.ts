import { Response, Request } from 'express';
import { HealthcheckController } from 'src/controllers/healthcheck';

describe('HealthcheckController', () => {
    const res = ({ status: undefined, json: undefined } as unknown) as Response;
    let req: Request;
    beforeEach(() => {
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        req = {} as Request;
    });

    describe('GET /healthcheck/liveness', () => {
        test('should return 200 OK', async () => {
            HealthcheckController.getHealthcheckLiveness(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: 'OK' });
        });
    });

    describe('GET /healthcheck/readiness', () => {
        test('should return 200 OK', async () => {
            HealthcheckController.getHealthcheckLiveness(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: 'OK' });
        });
    });
});
