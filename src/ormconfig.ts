import { ConnectionOptions } from 'typeorm';
import { entities } from 'src/entities';
import { migrations } from 'src/migrations';

const {
    // Envvars for default database connection
    PGHOST,
    PGPORT,
    PGUSER,
    PGPASSWORD,
    PGDATABASE,

    // Envvars for read replica database connection
    PGROHOST,
    PGROPORT,
    PGROUSER,
    PGROPASSWORD,

    NODE_ENV
} = process.env;

export const OrmConfig = {
    // synchronize: !isProduction, // npm run migration:generate -- <MigrationName>
    logging: false,
    entities,
    migrations,
    subscribers: [],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers'
    },

    // Will be overwritten by env vars refer .env.example
    type: 'sqlite',
    database: './backend-test.db'
} as ConnectionOptions;
