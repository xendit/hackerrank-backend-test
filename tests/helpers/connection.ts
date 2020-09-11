import { createConnection } from 'typeorm';
import { OrmConfig } from 'src/ormconfig';

export const createTestConnection = async () => {
    return createConnection(OrmConfig);
};
