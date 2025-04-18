import { Kysely, SqliteDialect } from 'kysely';
import { DB } from '@/database/types';
import Sqlite3 from 'better-sqlite3';

export function connectToDatabase(url: string) {
  return new Kysely<DB>({
    dialect: new SqliteDialect({
      database: new Sqlite3(url),
    }),
  });
}

export type Database = Kysely<DB>;
