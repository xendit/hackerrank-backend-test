import { Response, Request } from 'express';
import { FEATURE_FLAGS } from 'src/services/feature-flag';
import { FeatureFlagController, IFeatureFlagService } from 'src/controllers/feature-flag';

describe('FeatureFlagController', () => {
    const res = ({ status: undefined, json: undefined } as unknown) as Response;
    beforeEach(() => {
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
    });

    describe('GET /api/feature-flag', () => {
        it('should return 200 OK', async () => {
            const Mock = jest.fn<IFeatureFlagService, []>(() => ({
                getBooleanFlag: jest.fn().mockReturnValueOnce(false)
            }));
            const mock = new Mock();

            const controller = new FeatureFlagController(mock);
            await controller.getFeatureFlag(
                ({ query: { flagKey: FEATURE_FLAGS.TEST_FEATURE_FLAG } } as unknown) as Request,
                res
            );

            expect(mock.getBooleanFlag).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                key: FEATURE_FLAGS.TEST_FEATURE_FLAG,
                value: false
            });
        });
    });
});
