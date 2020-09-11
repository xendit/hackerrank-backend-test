/* eslint class-methods-use-this: 0 */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1571751456489 implements MigrationInterface {
    name = 'Init1571751456489';

    public async up(queryRunner: QueryRunner) {
        await queryRunner.query(
            `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
            undefined
        );
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }
}
