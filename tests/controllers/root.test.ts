import { Response, Request } from 'express';
import { RootController } from 'src/controllers/root';

describe('RootController', () => {
    const res = ({ status: undefined, json: undefined } as unknown) as Response;
    beforeEach(() => {
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
    });

    describe('GET /', () => {
        it('should return 200 OK', async () => {
            RootController.index({} as Request, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});
