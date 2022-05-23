import request from 'supertest';
import Admins from '../models/Admins';
import adminsSeed from '../seed/admins';
import app from '../app';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

describe('GET ALL admins', () => {
  test('All projects list status response succesfull', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBeFalsy();
  });
});
