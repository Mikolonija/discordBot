import { migrateToLatest } from '@/database/migrate';
import { describe, it, expect } from 'vitest';

describe('migrateToLatest - validation', () => {
  it('throws if databaseUrl is not provided at all', async () => {
    await expect(migrateToLatest()).rejects.toThrow();
  });
});
