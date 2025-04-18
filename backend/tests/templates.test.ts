import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import { app } from '@/index';
import { ITemplateBody } from '@/modules/templates/types';

let createdTemplateId: number;

describe('GET /templates', () => {
  it('should return 200 and template info', async () => {
    const response = await supertest(app).get('/templates');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
  });
});

describe('POST /templates', () => {
  it('should create a new template and return 200', async () => {
    const payload: ITemplateBody = { text: 'Sample template text for testing' };
    const response = await supertest(app).post('/templates').send(payload);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
    createdTemplateId = response.body.data[0].id;
  });

  it('should return 400 validate text length must greater than 300', async () => {
    const payload: ITemplateBody = { text: 'A'.repeat(301) };
    const response = await supertest(app).post('/templates').send(payload);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe('PATCH /templates/:id', () => {
  it('should update an existing template and return 200', async () => {
    const payload: ITemplateBody = { text: 'Updated template text' };
    const response = await supertest(app)
      .patch(`/templates/${createdTemplateId}`)
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
  it('should return 400 validate text length must greater than 300', async () => {
    const payload: ITemplateBody = { text: 'A'.repeat(301) };
    const response = await supertest(app)
      .patch(`/templates/${createdTemplateId}`)
      .send(payload);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe('DELETE /templates/:id', () => {
  it('should delete an existing template and return 200', async () => {
    const response = await supertest(app).delete(
      `/templates/${createdTemplateId}`
    );
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
