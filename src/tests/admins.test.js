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
    expect(response.body.message).toEqual('Admins found');
    expect(response.error).toBeFalsy();
  });
});

describe('GET admin by ID', () => {
  test('Admin search by ID status response successful', async () => {
    const response = await request(app)
      .get('/api/admins/id/628ab4225aae617fa8002c21')
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual(
      'Admin with id 628ab4225aae617fa8002c21 found',
    );
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
    const response = await request(app)
      .get('/api/admins/firstName/emilio')
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Admins found');
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
    const response = await request(app)
      .get('/api/admins/lastName/perez')
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Admins found');
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
    const response = await request(app)
      .get('/api/admins/email/emilioPerez@mail.com')
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Admin found');
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
    expect(response.body.message).toEqual('Admins found');
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

  test('Admin created status response unsuccessful due to required fields incomplete', async () => {
    const response = await request(app).post('/api/admins').send({
      firstName: 'Emilio',
      email: 'emilioPerez@mail.com',
      password: 'emiperez123',
      active: true,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe(undefined);
    expect(response.body.error).toBeTruthy();
  });

  test('Admin created status response unsuccessful due to incorrect mail format', async () => {
    const response = await request(app).post('/api/admins').send({
      firstName: 'Emilio',
      lastName: 'Perez',
      email: '...',
      password: 'emiperez123',
      active: true,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe(undefined);
    expect(response.body.error).toBeTruthy();
  });

  test('Admin created status response unsuccessful due to firstName with numbers', async () => {
    const response = await request(app).post('/api/admins').send({
      firstName: 'Emilio123',
      lastName: 'Perez',
      email: '...',
      password: 'emiperez123',
      active: true,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe(undefined);
    expect(response.body.error).toBeTruthy();
  });
});

describe('DELETE an admin', () => {
  test('Admin deleted status response successful', async () => {
    const response = await request(app).delete(`/api/admins/${adminId}`).send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual(`Admin with id ${adminId} deleted`);
    expect(response.error).toBeFalsy();
  });

  test('Admin deleted status response unsuccessful', async () => {
    const response = await request(app).delete('/api/admins').send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('UPDATE an admin', () => {
  test('Admin updated status response successful', async () => {
    const response = await request(app)
      .put('/api/admins/628ab4225aae617fa8002c21')
      .send({
        firstName: 'Pedro',
        lastName: 'Gomez',
        email: 'pedroGomezz@mail.com',
        password: 'pedrogomez123',
        active: false,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual(
      'The admin has been updated succesfully',
    );
    expect(response.body.error).toBeFalsy();
  });

  test('Admin updated status response successful despite required fields incomplete', async () => {
    const response = await request(app)
      .put('/api/admins/628ab4225aae617fa8002c21')
      .send({
        firstName: 'Emilio',
        email: 'emilioPerez@mail.com',
        password: 'emiperez123',
        active: true,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual(
      'The admin has been updated succesfully',
    );
    expect(response.body.error).toBeFalsy();
  });

  test('Admin updated status response unsuccessful', async () => {
    const response = await request(app).put('/api/admins/').send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test('Admin updated status response unsuccessful due to incorrect mail format', async () => {
    const response = await request(app)
      .put('/api/admins/628ab4225aae617fa8002c21')
      .send({
        firstName: 'Emilio',
        lastName: 'Perez',
        email: '...',
        password: 'emiperez123',
        active: true,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe(undefined);
    expect(response.error).toBeTruthy();
  });

  test('Admin updated status response unsuccessful due to firstName with numbers', async () => {
    const response = await request(app)
      .put('/api/admins/628ab4225aae617fa8002c21')
      .send({
        firstName: 'Emilio123',
        lastName: 'Perez',
        email: 'emilioPerez@mail.com',
        password: 'emiperez123',
        active: true,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe(undefined);
    expect(response.error).toBeTruthy();
  });
});
