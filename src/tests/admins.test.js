import request from 'supertest';
import admins from '../models/Admins';
import adminsSeed from '../seed/admins';
import app from '../app';

beforeAll(async () => {
  await admins.collection.insertMany(adminsSeed);
});

let adminId;

describe('GET ALL admins', () => {
  test('All admins list status response successful', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.message).toEqual('All admins');
    expect(response.error).toBeFalsy();
  });
});

describe('GET admin by ID', () => {
  test('Admin search by ID status response successful', async () => {
    const response = await request(app).get('/api/admins/id/628ab4225aae617fa8002c21').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Admin by id');
    expect(response.error).toBeFalsy();
  });

  test('Admin search by ID status response unsuccessful', async () => {
    const response = await request(app).get('/api/admins/id/').send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GET admins by firstName', () => {
  test('Admins search by firstName status response successful', async () => {
    const response = await request(app).get('/api/admins/firstName/emilio').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Admins by first name');
    expect(response.error).toBeFalsy();
  });
  test('Admins search by firstName status response unsuccessful', async () => {
    const response = await request(app).get('/api/admins/firstName/').send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GET admins by lastName', () => {
  test('Admins search by lastName status response successful', async () => {
    const response = await request(app).get('/api/admins/lastName/perez').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Admins by last name');
    expect(response.error).toBeFalsy();
  });
  test('Admins search by lastName status response unsuccessful', async () => {
    const response = await request(app).get('/api/admins/lastName/').send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GET admin by email', () => {
  test('Admin search by email status response successful', async () => {
    const response = await request(app).get('/api/admins/email/emilioPerez@mail.com').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Admin by email');
    expect(response.error).toBeFalsy();
  });
  test('Admins search by email status response unsuccessful', async () => {
    const response = await request(app).get('/api/admins/email/').send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GET admins by activity', () => {
  test('Admins search by activity status response successful', async () => {
    const response = await request(app).get('/api/admins/isActive/true').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Admins by active status');
    expect(response.error).toBeFalsy();
  });
  test('Admins search by activity status response unsuccessful', async () => {
    const response = await request(app).get('/api/admins/isActive/').send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('CREATE an admin', () => {
  test('Admin created status response successful', async () => {
    const response = await request(app).post('/api/admins').send({
      firstName: 'Emilio',
      lastName: 'Perez',
      email: 'emilioPerez@mail.com',
      password: 'emiperez123',
      active: true,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual('Admin created');
    expect(response.body.error).toBeFalsy();
    // eslint-disable-next-line no-underscore-dangle
    adminId = response.body.data._id;
  });

  test('Admin created status response unsuccessful', async () => {
    const response = await request(app).post('/api/admins').send();
    expect(response.statusCode).toBe(400);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE an admin', () => {
  test('Admin deleted status response successful', async () => {
    const response = await request(app).delete(`/api/admins/${adminId}`).send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual(`Admin with this id ${adminId} deleted`);
    expect(response.error).toBeFalsy();
  });

  test('Admin deleted status response unsuccessful', async () => {
    const response = await request(app).delete('/api/admins').send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
