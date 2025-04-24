import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import { app } from '@/index';
import { IMessageBody } from '@/modules/messages/types';

describe('POST /messages', () => {
  it('should return 400 for missing or invalid body', async () => {
    const payload: IMessageBody = {
      username: 'john',
      sprintCode: 'SPR001',
      channelId: 'CH001',
      templateId: '1',
    };
    const response = await supertest(app).post('/messages').send(payload);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe('Delete /messages', () => {
  it('should return 400 for missing or invalid body', async () => {
    const response = await supertest(app).delete('/messages/sdasd');
    expect(response.status).toBe(400);
  });
});

describe('Getting random messages', () => {
  it('Call the function without template id', async () => {
    const response = await supertest(app).post('/messages').send({
      username: 'john',
      sprintCode: 'SPR001',
      channelId: 'CH001',
    });
    expect(response.status).toBe(400);
  });
});

describe('GET /messages', () => {
  it('should return 200 and message list', async () => {
    const response = await supertest(app).get('/messages');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should return 200 when filtered by username', async () => {
    const response = await supertest(app).get('/messages?username=john');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should return 200 when filtered by sprintCode', async () => {
    const response = await supertest(app).get('/messages?sprintCode=SPR');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
