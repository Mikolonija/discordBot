import { Kysely } from 'kysely';
import { Template } from '@/database/types';

export async function up(db: Kysely<Template>): Promise<void> {
  await db.schema
    .createTable('template')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('text', 'text', (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<Template>): Promise<void> {
  await db.schema.dropTable('template').execute();
}
