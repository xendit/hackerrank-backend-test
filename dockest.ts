import { Dockest, logLevel } from 'dockest'; // eslint-disable-line
import jest from 'jest'; // eslint-disable-line

const { run } = new Dockest({
    composeFile: ['docker-compose.test.yml'],
    dumpErrors: true,
    jestLib: jest,
    logLevel: logLevel.DEBUG
});

run([
    {
        serviceName: 'postgres-test',
        readinessCheck: ({
            defaultReadinessChecks: { postgres },
            dockerComposeFileService: {
                environment: { POSTGRES_DB, POSTGRES_USER }
            }
        }) => postgres({ POSTGRES_DB, POSTGRES_USER })
    }
]);
