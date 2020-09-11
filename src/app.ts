import express, { Application } from 'express';
import httpContext from 'express-http-context';
import bodyParser from 'body-parser';
import compression from 'compression';

import { OpenApiValidator } from '@boxbag/xsh-node-openapi-validator';
import { errorHandler } from 'src/middlewares/handle-error-code';

import { init } from 'src/init';

/**
 * Setup the application routes with controllers
 * @param app
 */
async function setupRoutes(app: Application) {
    const { rootController, userController, errorController, healthcheckController } = await init();

    app.use('/api/users', userController.getRouter());
    app.use('/healthcheck', healthcheckController.getRouter());
    app.use('/errors', errorController.getRouter());
    app.use('/', rootController.getRouter());
}

/**
 * Main function to setup Express application here
 */
export async function createApp(): Promise<express.Application> {
    const app = express();
    app.set('port', process.env.PORT || 3000);
    app.use(compression());
    app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
    app.use(bodyParser.urlencoded({ extended: true }));

    const openApiValidator = new OpenApiValidator();
    await openApiValidator.install(app);

    // This should be last, right before routes are installed
    // so we can have access to context of all previously installed
    // middlewares inside our routes to be logged
    app.use(httpContext.middleware);

    await setupRoutes(app);

    app.use(errorHandler());

    return app;
}
