/**
 * This re-exporting of OrmConfig is to satisfy a missing feature/bug in TypeOrm wherein it requires a CommonJS style default export (module.exports=? / export=?) for its CLI to work properly
 * https://github.com/typeorm/typeorm/issues/4068
 */
import { OrmConfig } from 'src/ormconfig';

export = OrmConfig;
