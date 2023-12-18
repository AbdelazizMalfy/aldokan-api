import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigrations1702889395685 implements MigrationInterface {
  name = 'InitialMigrations1702889395685';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "address" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "role" character varying NOT NULL, "avatar" character varying, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_image_entity" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "productId" integer, CONSTRAINT "PK_e9409748603462bb9b48bc843b3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_ecbe8ebc20a3c7cd594d8e445e1" UNIQUE ("name"), CONSTRAINT "PK_1a38b9007ed8afab85026703a53" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, "stockQuantity" integer NOT NULL, "unitType" character varying NOT NULL, "weightPerUnit" character varying, "categoryId" integer, CONSTRAINT "PK_6e8f75045ddcd1c389c765c896e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_details_entity" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "price" numeric NOT NULL, "orderId" integer, "productId" integer, CONSTRAINT "PK_5c32bd2a68d993668204b2a969d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_entity" ("id" SERIAL NOT NULL, "orderDate" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment_entity" ("id" SERIAL NOT NULL, "amount" numeric NOT NULL, "paymentDate" TIMESTAMP NOT NULL, "paymentMethod" character varying NOT NULL, "orderId" integer, CONSTRAINT "REL_5a80c951bfda38e63d083ae7fb" UNIQUE ("orderId"), CONSTRAINT "PK_6c397c81035bd5b42d16ef3bc70" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "voucher_entity" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "discountValue" numeric NOT NULL, "discountType" character varying NOT NULL, "minPurchaseAmount" numeric NOT NULL, "usageLimit" integer NOT NULL, "validFrom" TIMESTAMP NOT NULL, "validTo" TIMESTAMP NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_9ae65171a5ea38814a98dd7a8b4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "voucher_usage_entity" ("id" SERIAL NOT NULL, "dateUsed" TIMESTAMP NOT NULL, "voucherId" integer, "userId" integer, "orderId" integer, CONSTRAINT "PK_8b04a62ea64279f285461459c19" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_image_entity" ADD CONSTRAINT "FK_19bada386dbab66c95eff614c8a" FOREIGN KEY ("productId") REFERENCES "product_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_entity" ADD CONSTRAINT "FK_641188cadea80dfe98d4c769ebf" FOREIGN KEY ("categoryId") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_entity" ADD CONSTRAINT "FK_28c5fd842f8531b8c1ec51ee608" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_entity" ADD CONSTRAINT "FK_3771c15083a43be45794c3acf8a" FOREIGN KEY ("productId") REFERENCES "product_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_entity" ADD CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_entity" ADD CONSTRAINT "FK_5a80c951bfda38e63d083ae7fb4" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher_usage_entity" ADD CONSTRAINT "FK_860350483f118b7b56f1c658611" FOREIGN KEY ("voucherId") REFERENCES "voucher_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher_usage_entity" ADD CONSTRAINT "FK_c7138db50ccb4840a19413bb71f" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher_usage_entity" ADD CONSTRAINT "FK_75bfa46351817d056b9f046f7a0" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "voucher_usage_entity" DROP CONSTRAINT "FK_75bfa46351817d056b9f046f7a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher_usage_entity" DROP CONSTRAINT "FK_c7138db50ccb4840a19413bb71f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher_usage_entity" DROP CONSTRAINT "FK_860350483f118b7b56f1c658611"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_entity" DROP CONSTRAINT "FK_5a80c951bfda38e63d083ae7fb4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_entity" DROP CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_entity" DROP CONSTRAINT "FK_3771c15083a43be45794c3acf8a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_entity" DROP CONSTRAINT "FK_28c5fd842f8531b8c1ec51ee608"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_entity" DROP CONSTRAINT "FK_641188cadea80dfe98d4c769ebf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_image_entity" DROP CONSTRAINT "FK_19bada386dbab66c95eff614c8a"`,
    );
    await queryRunner.query(`DROP TABLE "voucher_usage_entity"`);
    await queryRunner.query(`DROP TABLE "voucher_entity"`);
    await queryRunner.query(`DROP TABLE "payment_entity"`);
    await queryRunner.query(`DROP TABLE "order_entity"`);
    await queryRunner.query(`DROP TABLE "order_details_entity"`);
    await queryRunner.query(`DROP TABLE "product_entity"`);
    await queryRunner.query(`DROP TABLE "category_entity"`);
    await queryRunner.query(`DROP TABLE "product_image_entity"`);
    await queryRunner.query(`DROP TABLE "user_entity"`);
  }
}
