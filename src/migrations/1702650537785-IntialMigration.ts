import { MigrationInterface, QueryRunner } from 'typeorm';

export class IntialMigration1702650537785 implements MigrationInterface {
  name = 'IntialMigration1702650537785';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("userID" SERIAL NOT NULL, "userName" character varying NOT NULL, "address" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "role" character varying NOT NULL, "avatar" character varying, CONSTRAINT "PK_54862446efa457ce488dbd584ca" PRIMARY KEY ("userID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_entity" ("orderID" SERIAL NOT NULL, "orderDate" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "userUserID" integer, CONSTRAINT "PK_5cde584b9c82b30e0d4ef1694ec" PRIMARY KEY ("orderID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_image_entity" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "productProductID" integer, CONSTRAINT "PK_e9409748603462bb9b48bc843b3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_entity" ("productID" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, "stockQuantity" integer NOT NULL, "unitType" character varying NOT NULL, "weightPerUnit" character varying, CONSTRAINT "PK_9c285b2954fc7968b90f7d6266f" PRIMARY KEY ("productID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_details_entity" ("orderDetailsID" SERIAL NOT NULL, "quantity" integer NOT NULL, "price" numeric NOT NULL, "orderOrderID" integer, "productProductID" integer, CONSTRAINT "PK_3add776765a6dfef1143c5ffb42" PRIMARY KEY ("orderDetailsID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment_entity" ("paymentID" SERIAL NOT NULL, "amount" numeric NOT NULL, "paymentDate" TIMESTAMP NOT NULL, "paymentMethod" character varying NOT NULL, "orderOrderID" integer, CONSTRAINT "REL_6c1aaf4847685ac02848c339d5" UNIQUE ("orderOrderID"), CONSTRAINT "PK_fa314206d13146e8db525c842d2" PRIMARY KEY ("paymentID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "voucher_entity" ("voucherID" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "discountValue" numeric NOT NULL, "discountType" character varying NOT NULL, "minPurchaseAmount" numeric NOT NULL, "usageLimit" integer NOT NULL, "validFrom" TIMESTAMP NOT NULL, "validTo" TIMESTAMP NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_22db8addcef813890bb6eef92d8" PRIMARY KEY ("voucherID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "voucher_usage_entity" ("voucherUsageID" SERIAL NOT NULL, "dateUsed" TIMESTAMP NOT NULL, "voucherVoucherID" integer, "userUserID" integer, "orderOrderID" integer, CONSTRAINT "PK_b76f11f7953017a315ad41d4e11" PRIMARY KEY ("voucherUsageID"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_entity" ADD CONSTRAINT "FK_aca7db8c3a9dc738e2d61936212" FOREIGN KEY ("userUserID") REFERENCES "user_entity"("userID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_image_entity" ADD CONSTRAINT "FK_4156e2d987f0c79ccb989bbb136" FOREIGN KEY ("productProductID") REFERENCES "product_entity"("productID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_entity" ADD CONSTRAINT "FK_92e794ea9aa8461addf9d7da56c" FOREIGN KEY ("orderOrderID") REFERENCES "order_entity"("orderID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_entity" ADD CONSTRAINT "FK_0083c6796eb1b7ea454f9ceb5fc" FOREIGN KEY ("productProductID") REFERENCES "product_entity"("productID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_entity" ADD CONSTRAINT "FK_6c1aaf4847685ac02848c339d50" FOREIGN KEY ("orderOrderID") REFERENCES "order_entity"("orderID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher_usage_entity" ADD CONSTRAINT "FK_64666b2d67a797f5d7f25a1ca08" FOREIGN KEY ("voucherVoucherID") REFERENCES "voucher_entity"("voucherID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher_usage_entity" ADD CONSTRAINT "FK_61083cdcd9eb36a4de0c311f019" FOREIGN KEY ("userUserID") REFERENCES "user_entity"("userID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher_usage_entity" ADD CONSTRAINT "FK_c906ef1f1863556a206f2a9fb96" FOREIGN KEY ("orderOrderID") REFERENCES "order_entity"("orderID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "voucher_usage_entity" DROP CONSTRAINT "FK_c906ef1f1863556a206f2a9fb96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher_usage_entity" DROP CONSTRAINT "FK_61083cdcd9eb36a4de0c311f019"`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher_usage_entity" DROP CONSTRAINT "FK_64666b2d67a797f5d7f25a1ca08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_entity" DROP CONSTRAINT "FK_6c1aaf4847685ac02848c339d50"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_entity" DROP CONSTRAINT "FK_0083c6796eb1b7ea454f9ceb5fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_entity" DROP CONSTRAINT "FK_92e794ea9aa8461addf9d7da56c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_image_entity" DROP CONSTRAINT "FK_4156e2d987f0c79ccb989bbb136"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_entity" DROP CONSTRAINT "FK_aca7db8c3a9dc738e2d61936212"`,
    );
    await queryRunner.query(`DROP TABLE "voucher_usage_entity"`);
    await queryRunner.query(`DROP TABLE "voucher_entity"`);
    await queryRunner.query(`DROP TABLE "payment_entity"`);
    await queryRunner.query(`DROP TABLE "order_details_entity"`);
    await queryRunner.query(`DROP TABLE "product_entity"`);
    await queryRunner.query(`DROP TABLE "product_image_entity"`);
    await queryRunner.query(`DROP TABLE "order_entity"`);
    await queryRunner.query(`DROP TABLE "user_entity"`);
  }
}
