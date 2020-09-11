import LaunchDarkly, { LDClient } from 'launchdarkly-node-server-sdk';
import { logger } from 'src/util/logger';

export const LAUNCH_DARKLY_GLOBAL_USER = 'GLOBAL';
export const FEATURE_FLAGS = {
    TEST_FEATURE_FLAG: 'test-feature-flag'
};

export class FeatureFlagService {
    launchDarklyClient: LDClient;

    constructor() {
        const apiKey: string = process.env.LAUNCH_DARKLY_SDK_KEY || '';
        const offline = process.env.NODE_ENV === 'test';
        this.launchDarklyClient = LaunchDarkly.init(apiKey, { logger, offline });
    }

    private async waitForInitialization() {
        if (!this.launchDarklyClient.initialized) {
            try {
                logger.info('Initialization of LaunchDarkly client starting...');
                await this.launchDarklyClient.waitForInitialization();
                logger.info('Initialization of LaunchDarkly client succeeded...');
            } catch (err) {
                logger.error(err, 'Initialization of LaunchDarkly client failed.');
            }
        }
    }

    async getBooleanFlag(flagName: string) {
        await this.waitForInitialization();
        return this.launchDarklyClient.variation(
            flagName || FEATURE_FLAGS.TEST_FEATURE_FLAG,
            { key: LAUNCH_DARKLY_GLOBAL_USER },
            false
        );
    }
}
