import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEntityConstraints1702912411854 implements MigrationInterface {
  name = 'UserEntityConstraints1702912411854';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "userName"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "userName" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "user_entity" ADD "address" text`);
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "email" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email")`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "password" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "phone" character varying(15)`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "role"`);
    await queryRunner.query(
      `CREATE TYPE "public"."user_entity_role_enum" AS ENUM('user', 'admin')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "role" "public"."user_entity_role_enum" NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "avatar"`);
    await queryRunner.query(`ALTER TABLE "user_entity" ADD "avatar" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "avatar"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "avatar" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."user_entity_role_enum"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "role" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "phone" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "password" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" DROP CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5"`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "address"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "address" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "userName"`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "userName" character varying(50) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "updated"`);
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "created"`);
  }
}
