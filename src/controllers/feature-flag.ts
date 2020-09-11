import { Request, Response, Router } from 'express';

export interface IFeatureFlagService {
    getBooleanFlag(flagName: string): Promise<boolean>;
}

export class FeatureFlagController {
    featureFlagService: IFeatureFlagService;

    private router: Router;

    constructor(featureFlagService: IFeatureFlagService) {
        this.featureFlagService = featureFlagService;
        this.router = Router();
        this.router.get('/', this.getFeatureFlag.bind(this));
    }

    getRouter() {
        return this.router;
    }

    /**
     * GET /api/featureFlag
     *
     * @param req.params.flagKey {String} Specified key of the feature flag from LaunchDarkly
     *
     * Check whether we are able to retrieve the feature flag and return the response
     */
    async getFeatureFlag(req: Request, res: Response) {
        const flagKey = req.query.flagKey ? String(req.query.flagKey) : '';
        const flagValue: boolean = await this.featureFlagService.getBooleanFlag(flagKey);
        return res.status(200).json({
            key: flagKey,
            value: flagValue
        });
    }
}
