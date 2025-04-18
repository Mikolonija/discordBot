import { Kysely } from 'kysely';
import { Message } from '@/database/types';

export async function up(db: Kysely<Message>): Promise<void> {
  await db.schema
    .createTable('message')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('username', 'text', (col) => col.notNull())
    .addColumn('sprintCode', 'text', (col) => col.notNull())
    .addColumn('templateId', 'integer', (col) => col.notNull())
    .addColumn('message', 'text', (col) => col.notNull())
    .addColumn('giphy', 'text', (col) => col.notNull())
    .addColumn('channelId', 'text', (col) => col.notNull())
    .addColumn('createdAt', 'text', (col) =>
      col.defaultTo(new Date().toISOString())
    )
    .execute();
}

export async function down(db: Kysely<Message>): Promise<void> {
  await db.schema.dropTable('message').execute();
}
