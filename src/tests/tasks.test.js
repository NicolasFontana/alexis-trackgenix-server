import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import taskSeed from '../seed/tasks';

beforeAll(async () => {
  await Tasks.collection.insertMany(taskSeed);
});

describe('GET /api/tasks', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/api/tasks').send();
    await expect(response.status).toBe(200);
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/api-tasks').send();
    await expect(response.status).toBe(404);
  });
});
