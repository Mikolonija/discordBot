import * as path from 'node:path';
import * as fss from 'fs';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { Migrator, FileMigrationProvider } from 'kysely';
import { connectToDatabase } from '@/database/index';
import 'dotenv/config';

const MIGRATIONS_PATH = './migrations';
const { DATABASE_URL } = process.env;

export async function migrateToLatest(databaseUrl?: string): Promise<void> {
  if (!databaseUrl || typeof databaseUrl !== 'string') {
    throw new Error('Provide DATABASE_URL in your environment variables.');
  }

  const directory = path.dirname(databaseUrl);
  if (!fss.existsSync(directory)) {
    fss.mkdirSync(directory, { recursive: true });
  }

  const db = connectToDatabase(databaseUrl);
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(dirname, MIGRATIONS_PATH),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  if (!results?.length) {
    throw new Error('No migrations to run.');
  }

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.info(
        `Migration "${it.migrationName}" was executed successfully.`
      );
    } else if (it.status === 'Error') {
      throw new Error('Failed to execute migration');
    }
  });

  if (error) {
    throw new Error('Failed to migrate.');
  }

  await db.destroy();
}

migrateToLatest(DATABASE_URL as string)
  .then(() => {
    console.log('Migration completed');
  })
  .catch((err) => {
    console.error(err);
  });
