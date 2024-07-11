import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1720596702051 implements MigrationInterface {
  name = 'Migration1720596702051';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" ADD "note" text NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "note"`);
  }
}
