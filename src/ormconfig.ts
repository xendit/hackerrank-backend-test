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
const isProduction = NODE_ENV === 'production';

export const OrmConfig = {
    // synchronize: !isProduction, // npm run migration:generate -- <MigrationName>
    logging: !isProduction,
    entities,
    migrations,
    subscribers: [],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers'
    },

    // Will be overwritten by env vars refer .env.example
    type: 'postgres',
    extra: {
        // db.getClient wait time on a full pool connection before timing out
        connectionTimeoutMillis: 10000,

        // time before the pool releases the client and db.getClient has to reconnect
        idleTimeoutMillis: 60000,

        // time to consider query is taking too long
        statement_timeout: 360000, // 6 minutes

        // Increase the default pool of 10 connections for node-pg
        // https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md#common-connection-options
        // https://node-postgres.com/api/pool
        // Rough guideline on what is the right max number
        // max = (max_connection / instance_count) - instance_count
        // eg 103 = (4000 / 30) - 30
        // -- max_connection = https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Managing.Performance.html
        // -- instance_count = number of connected instance inclusive of queue runners & crons for the whole cluster
        max: isProduction ? 50 : 10
    },
    replication: {
        // read-write connection
        master: {
            database: PGDATABASE || 'test',
            host: PGHOST || 'localhost',
            port: PGPORT || 54320,
            username: PGUSER || 'test',
            password: PGPASSWORD || 'test'
        },
        slaves: [
            {
                database: PGDATABASE || 'test',
                host: PGROHOST || PGHOST || 'localhost',
                port: PGROPORT || PGPORT || 54320,
                username: PGROUSER || PGUSER || 'test',
                password: PGROPASSWORD || PGPASSWORD || 'test'
            }
        ]
        // read-only connection
    }
} as ConnectionOptions;
