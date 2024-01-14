import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductImage1705157342896 implements MigrationInterface {
  name = 'ProductImage1705157342896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_entity" ADD "image" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "image"`);
  }
}
