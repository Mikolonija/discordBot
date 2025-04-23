import { describe, it } from 'vitest';
import supertest from 'supertest';
import { app } from '@/index';

describe('GET /profile', () => {
  it('should return 200 and profile info', async () => {
    const response = await supertest(app).get('/profile');
    expect(response.status).toBe(200);
  });
});
