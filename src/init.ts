// This needs to be imported before everything else.
// eslint-disable-next-line import/order, @typescript-eslint/no-unused-vars
import { tracer } from './util/tracer';

import 'reflect-metadata'; // for TypeORM
import { getCustomRepository } from 'typeorm';

import { connect } from 'src/util/db-connect';
import { RootController } from 'src/controllers/root';
import { HealthcheckController } from 'src/controllers/healthcheck';
import { FeatureFlagService } from 'src/services/feature-flag';
import { FeatureFlagController } from 'src/controllers/feature-flag';
import { UserService } from 'src/services/user';
import { UserRepository } from 'src/repositories/user';
import { UsersController } from 'src/controllers/user';
import { ErrorService } from 'src/services/error-example';
import { ErrorController } from 'src/controllers/error';

/**
 * Initialize all ENV values and dependencies here so that they are re-usable across web servers, queue runners and crons
 */
export async function init() {
    // repositories
    await connect();
    const userRepo = getCustomRepository(UserRepository);

    // services
    const userService = new UserService(userRepo);
    const errorService = new ErrorService();
    const featureFlagService = new FeatureFlagService();

    // controllers
    const rootController = new RootController();
    const userController = new UsersController(userService);
    const errorController = new ErrorController(errorService);
    const featureFlagController = new FeatureFlagController(featureFlagService);
    const healthcheckController = new HealthcheckController();

    return {
        userRepo,

        userService,
        errorService,
        featureFlagService,

        rootController,
        userController,
        errorController,
        featureFlagController,
        healthcheckController
    };
}
