import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefreshToken1702935357402 implements MigrationInterface {
  name = 'RefreshToken1702935357402';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" DROP COLUMN "refreshToken"`,
    );
  }
}
