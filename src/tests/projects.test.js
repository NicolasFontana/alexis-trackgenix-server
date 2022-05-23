import request from 'supertest';
import Projects from '../models/Projects';
import projectsSeed from '../seed/projects';
import app from '../app';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

describe('GET ALL project', () => {
  test('All projects list', async () => {
    const response = await (await request(app).get('/api/projects'));
    expect(response.body.message).toBe('Success!');
    expect(response.statusCode).toBe(200);
    // expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
});
