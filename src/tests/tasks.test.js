import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import taskSeed from '../seed/tasks';

beforeAll(async () => {
  await Tasks.collection.insertMany(taskSeed);
});

// Test for GET all by Fer;

describe('GET /api/tasks', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/api/tasks').send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('All tasks');
    expect(response.body.data).toEqual(expect.any(Object));
    expect(response.body.error).toBeFalsy();
  });

  test('Wrong path', async () => {
    const response = await request(app).get('/api-tasks').send();
    await expect(response.status).toBe(404);
  });
});
