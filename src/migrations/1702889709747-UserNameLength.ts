import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserNameLength1702889709747 implements MigrationInterface {
  name = 'UserNameLength1702889709747';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "userName"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "userName" character varying(50) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "userName"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "userName" character varying NOT NULL`,
    );
  }
}
