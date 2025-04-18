import { Kysely } from 'kysely';
import { Sprint } from '@/database/types';

export async function up(db: Kysely<Sprint>): Promise<void> {
  await db.schema
    .createTable('sprint')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('code', 'text', (col) => col.notNull().unique())
    .addColumn('title', 'text', (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<Sprint>): Promise<void> {
  await db.schema.dropTable('sprint').execute();
}
