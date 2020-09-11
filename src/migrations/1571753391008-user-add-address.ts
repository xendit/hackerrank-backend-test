/* eslint class-methods-use-this: 0 */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAddAddress1571753391008 implements MigrationInterface {
    name = 'UserAddAddress1571753391008';

    public async up(queryRunner: QueryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`, undefined);
    }
}
