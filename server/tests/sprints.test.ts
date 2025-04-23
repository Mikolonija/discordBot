import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import { app } from '@/index';
import { ISprintBody } from '@/modules/sprints/types';

let createdSprintId: number;

describe('POST /sprints', () => {
  it('should create a new sprint and return 200', async () => {
    const payload: ISprintBody = {
      title: 'Sample sprint text for testing',
      code: '001',
    };

    const response = await supertest(app).post('/sprints').send(payload);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    createdSprintId = response.body.data[0].id;
  });

  it('should return 400 validate sprint text length must greater than 130', async () => {
    const payload: ISprintBody = {
      title: 'Sample sprint text for testing',
      code: 'A'.repeat(200),
    };
    const response = await supertest(app).post('/sprints').send(payload);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('should return 400 validate sprint code length must greater than 20', async () => {
    const payload: ISprintBody = {
      title: 'Sample sprint text for testing',
      code: 'A'.repeat(30),
    };
    const response = await supertest(app).post('/sprints').send(payload);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe('PATCH /sprints/:id', () => {
  it('should update an existing sprint and return 200', async () => {
    const payload: ISprintBody = {
      title: 'Sample sprint text for testing',
      code: '002',
    };

    const response = await supertest(app)
      .patch(`/sprints/${createdSprintId}`)
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should return 400 validate sprint text length must greater than 130', async () => {
    const payload: ISprintBody = {
      title: 'Sample sprint text for testing',
      code: 'A'.repeat(200),
    };
    const response = await supertest(app)
      .patch(`/sprints/${createdSprintId}`)
      .send(payload);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('should return 400 validate sprint code length must greater than 20', async () => {
    const payload: ISprintBody = {
      title: 'Sample sprint text for testing',
      code: 'A'.repeat(30),
    };
    const response = await supertest(app)
      .patch(`/sprints/${createdSprintId}`)
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe('DELETE /sprints/:id', () => {
  it('should delete an existing sprint and return 200', async () => {
    const response = await supertest(app).delete(`/sprints/${createdSprintId}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

describe('GET /sprints', () => {
  it('should return 200 and sprints info', async () => {
    const response = await supertest(app).get('/sprints');
    expect(response.status).toBe(200);
  });
});
