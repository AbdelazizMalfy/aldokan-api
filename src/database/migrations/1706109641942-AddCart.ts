import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCart1706109641942 implements MigrationInterface {
  name = 'AddCart1706109641942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_in_cart_entity" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "productId" integer, "cartId" integer, CONSTRAINT "PK_4f14ea17a96c76c30600ec3bcd1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart_entity" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "REL_8edda4b36869b45de9624747e8" UNIQUE ("userId"), CONSTRAINT "PK_7ec8a182dc29da3b1df23408149" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_in_cart_entity" ADD CONSTRAINT "FK_5ff91cf5d0758eed1fb78179a25" FOREIGN KEY ("productId") REFERENCES "product_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_in_cart_entity" ADD CONSTRAINT "FK_7f018d282d2e6d7aae4352e923d" FOREIGN KEY ("cartId") REFERENCES "cart_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_entity" ADD CONSTRAINT "FK_8edda4b36869b45de9624747e8a" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_entity" DROP CONSTRAINT "FK_8edda4b36869b45de9624747e8a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_in_cart_entity" DROP CONSTRAINT "FK_7f018d282d2e6d7aae4352e923d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_in_cart_entity" DROP CONSTRAINT "FK_5ff91cf5d0758eed1fb78179a25"`,
    );
    await queryRunner.query(`DROP TABLE "cart_entity"`);
    await queryRunner.query(`DROP TABLE "product_in_cart_entity"`);
  }
}
