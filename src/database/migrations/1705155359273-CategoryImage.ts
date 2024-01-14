import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryImage1705155359273 implements MigrationInterface {
  name = 'CategoryImage1705155359273';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category_entity" ADD "image" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category_entity" DROP COLUMN "image"`,
    );
  }
}
