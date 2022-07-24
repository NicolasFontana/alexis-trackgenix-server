import request from 'supertest';
import superAdmins from '../models/Super-admins';
import superAdminsSeed from '../seed/super-admins';
import app from '../app';

beforeAll(async () => {
  await superAdmins.collection.insertMany(superAdminsSeed);
});

let superAdminId;

describe('GET ALL superAdmins', () => {
  test.skip('All superAdmins list status response successful', async () => {
    const response = await request(app).get('/api/super-admins').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.message).toEqual('All Superadmins');
    expect(response.error).toBeFalsy();
  });
});

describe('GET superAdmin by ID', () => {
  test.skip('SuperAdmin search by ID status response successful', async () => {
    const response = await request(app)
      .get('/api/super-admins/628ab4225aae617fa8002c22')
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test.skip('SuperAdmin search by ID status response unsuccessful', async () => {
    const response = await request(app).get('/api/super-admins/id/').send();
    expect(response.statusCode).toBe(400);
    expect(response.error).toBeTruthy();
  });
});

describe('GET superAdmins by firstName', () => {
  test.skip('SuperAdmins search by firstName status response successful', async () => {
    const response = await request(app)
      .get('/api/super-admins/first-name/juan')
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Superadmins filtered by first name');
    expect(response.error).toBeFalsy();
  });

  test.skip('SuperAdmins search by firstName status response unsuccessful', async () => {
    const response = await request(app)
      .get('/api/super-admins/first-name/maria')
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GET superAdmins by lastName', () => {
  test.skip('SuperAdmins search by lastName status response successful', async () => {
    const response = await request(app)
      .get('/api/super-admins/last-name/gomez')
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Superadmins filtered by last name');
    expect(response.error).toBeFalsy();
  });

  test.skip('SuperAdmins search by lastName status response unsuccessful', async () => {
    const response = await request(app)
      .get('/api/super-admins/last-name/asd')
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GET superAdmins by email', () => {
  test.skip('SuperAdmins search by email status response successful', async () => {
    const response = await request(app)
      .get('/api/super-admins/email/juanGomezz@mail.com')
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Superadmins filtered by email');
    expect(response.error).toBeFalsy();
  });

  test.skip('SuperAdmins search by email status response unsuccessful', async () => {
    const response = await request(app)
      .get('/api/super-admins/email/asd')
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GET superAdmins by active', () => {
  test.skip('SuperAdmins search by active status response successful', async () => {
    const response = await request(app)
      .get('/api/super-admins/active/false')
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Superadmins filtered by active');
    expect(response.error).toBeFalsy();
  });

  test.skip('SuperAdmins search by active status response unsuccessful', async () => {
    const response = await request(app)
      .get('/api/super-admins/active/true')
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('CREATE a superAdmin', () => {
  test.skip('SuperAdmin created status response successful', async () => {
    const response = await request(app).post('/api/super-admins').send({
      firstName: 'Juan',
      lastName: 'Gomez',
      email: 'juanGomezz@mail.com',
      password: 'juangomez123',
      active: false,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual('Superadmin created');
    expect(response.body.error).toBeFalsy();
    // eslint-disable-next-line no-underscore-dangle
    superAdminId = response.body.data._id;
  });

  test.skip('SuperAdmin created status response unsuccessful', async () => {
    const response = await request(app).post('/api/super-admins').send();
    expect(response.statusCode).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test.skip('SuperAdmin created status response unsuccessful due to required fields incomplete', async () => {
    const response = await request(app).post('/api/super-admins').send({
      firstName: 'juan',
      email: 'juanGomezz@mail.com',
      password: 'juangomez123',
      active: false,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe(undefined);
    expect(response.body.error).toBeTruthy();
  });

  test.skip('SuperAdmin created status response unsuccessful due to incorrect mail format', async () => {
    const response = await request(app).post('/api/super-admins').send({
      firstName: 'juan',
      lastName: 'gomez',
      email: '...',
      password: 'juangomez123',
      active: false,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe(undefined);
    expect(response.body.error).toBeTruthy();
  });

  test.skip('SuperAdmin created status response unsuccessful due to firstName with numbers', async () => {
    const response = await request(app).post('/api/super-admins').send({
      firstName: 'juan123',
      lastName: 'gomez',
      email: 'juanGomezz@mail.com',
      password: 'juangomez123',
      active: false,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe(undefined);
    expect(response.body.error).toBeTruthy();
  });
});

describe('DELETE a superAdmin', () => {
  test.skip('SuperAdmin deleted status response successful', async () => {
    const response = await request(app)
      .delete(`/api/super-admins/${superAdminId}`)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('User eliminated');
    expect(response.error).toBeFalsy();
  });

  test.skip('SuperAdmin deleted status response unsuccessful', async () => {
    const response = await request(app).delete('/api/super-admins').send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('UPDATE a superAdmin', () => {
  test.skip('SuperAdmin updated status response successful', async () => {
    const response = await request(app)
      .put('/api/super-admins/628ab4225aae617fa8002c22')
      .send({
        firstName: 'Pedro',
        lastName: 'Gomez',
        email: 'pedroGomezz@mail.com',
        password: 'pedrogomez123',
        active: false,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual(
      'The super admin has been updated successfully',
    );
    expect(response.body.error).toBeFalsy();
  });

  test.skip('SuperAdmin updated status response successful despite required fields incomplete', async () => {
    const response = await request(app)
      .put('/api/super-admins/628ab4225aae617fa8002c22')
      .send({
        firstName: 'Pedro',
        email: 'pedroGomezz@mail.com',
        password: 'pedrogomez123',
        active: false,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual(
      'The super admin has been updated successfully',
    );
    expect(response.body.error).toBeFalsy();
  });

  test.skip('SuperAdmin updated status response unsuccessful', async () => {
    const response = await request(app).put('/api/super-admins/').send();
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test.skip('SuperAdmin updated status response unsuccessful due to incorrect mail format', async () => {
    const response = await request(app)
      .put('/api/super-admins/628ab4225aae617fa8002c22')
      .send({
        firstName: 'pedro',
        lastName: 'gomez',
        email: '...',
        password: 'pedrogomez123',
        active: false,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe(undefined);
    expect(response.error).toBeTruthy();
  });

  test.skip('SuperAdmin updated status response unsuccessful due to firstName with numbers', async () => {
    const response = await request(app)
      .put('/api/super-admins/628ab4225aae617fa8002c22')
      .send({
        firstName: 'Emilio123',
        lastName: 'Perez',
        email: 'pedroGomezz@mail.com',
        password: 'emiperez123',
        active: true,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe(undefined);
    expect(response.error).toBeTruthy();
  });
});
