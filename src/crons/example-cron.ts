import '../module-alias';

import { logger } from 'src/util/logger';
import { sleep } from 'src/util/sleep';

const doWork = async () => {
    logger.info(`Current time is ${Date.now()}`);
    await sleep(1000);
};

(async () => {
    try {
        await doWork();
    } catch (err) {
        logger.error(err, 'error in doing work');
    } finally {
        logger.info('done');
    }
})();
