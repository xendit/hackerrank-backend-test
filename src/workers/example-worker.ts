import '../module-alias';

import { logger } from 'src/util/logger';
import { sleep } from 'src/util/sleep';

const doWork = async () => {
    logger.info(`Current time is ${Date.now()}`);
    await sleep(1000);
};

(async () => {
    // Worker runner
    // eslint-disable-next-line
    while (true) {
        try {
            await doWork(); // eslint-disable-line
        } catch (err) {
            logger.error(err, 'error in worker');
        } finally {
            logger.info('done');
        }
    }
})();
