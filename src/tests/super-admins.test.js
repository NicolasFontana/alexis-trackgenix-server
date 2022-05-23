import request from 'supertest';
import SuperAdmins from '../models/Super-admins';
import adminsSeed from '../seed/admins';
import app from '../app';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(adminsSeed);
});

describe('GET ALL Super admins', () => {
  test('All projects list status response succesfull', async () => {
    const response = await request(app).get('/api/superadmin').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBeFalsy();
  });
});
