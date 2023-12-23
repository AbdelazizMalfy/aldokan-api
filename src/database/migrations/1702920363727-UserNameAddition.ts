import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserNameAddition1702920363727 implements MigrationInterface {
  name = 'UserNameAddition1702920363727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "userName"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "firstName" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "lastName" character varying(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" DROP COLUMN "firstName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "userName" character varying(255) NOT NULL`,
    );
  }
}
