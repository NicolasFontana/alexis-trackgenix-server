import mongoose from 'mongoose';
import request from 'supertest';
import Employees from '../models/Employees';
import employeesSeed from '../seed/employees';
import app from '../app';
import Firebase from '../helper/firebase';

let employeeId;

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});
// GETS TEST BY MARTIN
describe('Get all employees', () => {
  test.skip('response should return a 200 status', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(response.status).toBe(200);
  });

  test.skip('response should return false error', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(response.error).not.toBeTruthy();
  });

  test.skip('response should return at least one employee', async () => {
    const response = await request(app).get('/api/employees').send();
    expect.arrayContaining(response.data);
  });
});

describe('Get employee by id', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app)
      .get('/api/employees/6288fe568cb389708e53eb0e')
      .send();
    expect(response.status).toEqual(200);
  });

  test('response should return false error', async () => {
    const response = await request(app)
      .get('/api/employees/6288fe568cb389708e53eb0e')
      .send();
    expect(response.error).not.toBeTruthy();
  });

  test('response should not be empty', async () => {
    const response = await request(app)
      .get('/api/employees/6288fe568cb389708e53eb0e')
      .send();
    expect.arrayContaining(response.data);
  });

  test('response should return this particular employee', async () => {
    const response = await request(app)
      .get('/api/employees/6288fe568cb389708e53eb0e')
      .send();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data._id).toBe('6288fe568cb389708e53eb0e');
  });

  test('response should return 404 status', async () => {
    const response = await request(app)
      .get('/api/employees/6288fe568cb389708e53eb0f')
      .send();
    expect(response.status).toBe(404);
  });

  test('response should return true error', async () => {
    const response = await request(app)
      .get('/api/employees/6288fe568cb389708e53eb0f')
      .send();
    expect(response.error).toBeTruthy();
  });

  test('response should return a message like this: Missing id parameter', async () => {
    const response = await request(app)
      .get('/api/employees/6288fe568cb389708e53eb0f')
      .send();
    expect(response.body.message).toBe('Missing id parameter');
  });
});

describe('Get employee by first name', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app)
      .get('/api/employees/firstName/Puche')
      .send();
    expect(response.status).toBe(200);
  });

  test('response should return a message like this: Employee with firstName Puche', async () => {
    const response = await request(app)
      .get('/api/employees/firstName/Puche')
      .send();
    expect(response.body.message).toContain('Employee with firstName');
  });

  test('response should return false error', async () => {
    const response = await request(app)
      .get('/api/employees/firstName/Puche')
      .send();
    expect(response.error).not.toBeTruthy();
  });

  test('response should not be empty', async () => {
    const response = await request(app)
      .get('/api/employees/firstName/Puche')
      .send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should return 404 status', async () => {
    const response = await request(app)
      .get('/api/employees/firstName/1Puche')
      .send();
    expect(response.status).toBe(404);
  });

  test('response should return true error', async () => {
    const response = await request(app)
      .get('/api/employees/firstName/1Puche')
      .send();
    expect(response.error).toBeTruthy();
  });

  test('response should return a message like this: missing firstName parameter', async () => {
    const response = await request(app)
      .get('/api/employees/firstName/1Puche')
      .send();
    expect(response.body.message).toBe('Missing firstName parameter');
  });
});

describe('Get employee by lastName', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app)
      .get('/api/employees/lastName/Lopez')
      .send();
    expect(response.status).toBe(200);
  });

  test('response should return a message like this: Employee with lastName Lopez', async () => {
    const response = await request(app)
      .get('/api/employees/lastName/Lopez')
      .send();
    expect(response.body.message).toBe('Employee with lastName Lopez found');
  });

  test('response should return false error', async () => {
    const response = await request(app)
      .get('/api/employees/lastName/Lopez')
      .send();
    expect(response.error).not.toBeTruthy();
  });

  test('response should not be empty', async () => {
    const response = await request(app)
      .get('/api/employees/lastName/Lopez')
      .send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should return 404 status', async () => {
    const response = await request(app)
      .get('/api/employees/lastName/1Lopez')
      .send();
    expect(response.status).toBe(404);
  });

  test('response should return true error', async () => {
    const response = await request(app)
      .get('/api/employees/lastName/1Lopez')
      .send();
    expect(response.error).toBeTruthy();
  });

  test('response should return a message like this: missing lastName parameter', async () => {
    const response = await request(app)
      .get('/api/employees/lastName/1Lopez')
      .send();
    expect(response.body.message).toBe('Missing lastName parameter');
  });
});

describe('Get employee by active status', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app)
      .get('/api/employees/active/false')
      .send();
    expect(response.status).toBe(200);
  });

  test('response should return a message like this: Employee with status false', async () => {
    const response = await request(app)
      .get('/api/employees/active/false')
      .send();
    expect(response.body.message).toBe('Employee with status false found');
  });

  test('response should return false error', async () => {
    const response = await request(app)
      .get('/api/employees/active/false')
      .send();
    expect(response.error).not.toBeTruthy();
  });

  test('response should not empty', async () => {
    const response = await request(app)
      .get('/api/employees/active/false')
      .send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should return 400 status', async () => {
    const response = await request(app)
      .get('/api/employees/active/truue')
      .send();
    expect(response.status).toBe(400);
  });

  test('response should return true error', async () => {
    const response = await request(app)
      .get('/api/employees/active/true')
      .send();
    expect(response.error).toBeTruthy();
  });

  test('response should return a message like this: missing active parameter', async () => {
    const response = await request(app)
      .get('/api/employees/active/true')
      .send();
    expect(response.body.message).toBe('missing active parameter');
  });
});
// CREATE TESTS BY MARTIN
describe('Create employee', () => {
  test('response should return 201 status', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      lastName: 'Lopez',
      phone: '7761785000',
      email: 'juansopez3@people.com',
      password: 'password123',
      active: false,
      isDeleted: false,
      isProjectManager: false,
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Employee created');
    expect(response.body.error).toBeFalsy();
    // eslint-disable-next-line no-underscore-dangle
    employeeId = response.body.data._id;
  });
  test('no first name - response should return 400 status', async () => {
    const response = await request(app).post('/api/employees/').send({
      lastName: 'Lopez',
      phone: '7761785000',
      email: 'juansopez1111@people.com',
      password: 'password123',
      active: false,
      isProjectManager: false,
    });
    expect(response.status).toBe(400);
  });
  test('no last name - response should return 400 status', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      phone: '7761785000',
      email: 'juansopez11111@people.com',
      password: 'password123',
      active: false,
      isProjectManager: false,
    });
    expect(response.status).toBe(400);
  });
  test('no phone - response should return 400 status', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      lastName: 'Lopez',
      email: 'juansopez2@people.com',
      password: 'password123',
      active: false,
      isProjectManager: false,
    });
    expect(response.status).toBe(400);
  });
  test('no email - response should return 400 status', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      lastName: 'Lopez',
      phone: '7761785000',
      password: 'password123',
      active: false,
      isProjectManager: false,
    });
    expect(response.status).toBe(400);
  });
  test('no password - response should return 400 status', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      lastName: 'Lopez',
      phone: '7761785000',
      email: 'juansopez22@people.com',
      active: false,
      isProjectManager: false,
    });
    expect(response.status).toBe(400);
  });
  test('no status - response should return 400 status', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      lastName: 'Lopez',
      phone: '7761785000',
      email: 'juansopez222@people.com',
      password: 'password123',
      isProjectManager: false,
    });
    expect(response.status).toBe(400);
  });
  test('no project manager status - response should return 400 status', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      lastName: 'Lopez',
      phone: '7761785000',
      email: 'juansopez2222@people.com',
      password: 'password123',
      active: false,
    });
    expect(response.status).toBe(400);
  });
});

describe('Create employee invalid', () => {
  test('invalid firstName - response should be: Invalid name, it must contain more than 3 letters', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: '_',
      lastName: 'Lopez',
      phone: '7761785000',
      email: 'juansopez22222@people.com',
      password: 'password123',
      active: false,
      isProjectManager: false,
    });
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe(
      'Invalid name, it must contain more than 3 letters',
    );
  });
});

// Javi
describe('Edit employee', () => {
  test('response should return message like this: Employee updated', async () => {
    const response = await request(app)
      .put('/api/employees/6288fe568cb389708e53eb0e')
      .send({
        firstName: 'Pucheprueba',
        lastName: 'Lopez',
        phone: '7761785000',
        email: 'juansopez@people.com',
        password: 'tuvieja123123',
        active: false,
        isProjectManager: false,
        projects: ['628ab4225aae617fa8002c21'],
        timeSheets: ['6289c467fc13ae72d60000c7'],
      });
    expect(response.body.message).toEqual(
      'The employee has been updated succesfully',
    );
  });

  test('response should return 404 status when no id is entered', async () => {
    const response = await request(app).put('/api/employees/').send({});
    expect(response.status).toBe(404);
  });

  test('response should return 404 status when the id entered is not found', async () => {
    const response = await request(app)
      .put('/api/employees/628c6962126e9522236c0481')
      .send({
        firstName: 'Pucheprueba',
        lastName: 'Lopez',
        phone: '7761785000',
        email: 'juansopez@people.com.cn',
        password: 'tuvieja123123',
        active: false,
        isProjectManager: false,
        projects: ['62883891a6c3e40d965f7f8c'],
        timeSheets: ['62883891a6c3e40d965f7f8c'],
      });
    expect(response.status).toBe(404);
  });
});

// Javi
describe('Delete employee', () => {
  test('response should return a true error when no id is send', async () => {
    const response = await request(app).delete('/api/employees/').send();
    expect(response.error).toBeTruthy();
  });

  test('response should return a message like this: Employee with id deleted', async () => {
    const response = await request(app)
      .delete(`/api/employees/${employeeId}`)
      .send();
    expect(response.body.message).toEqual(
      `Employee with id ${employeeId} deleted.`,
    );
    await Firebase.auth().deleteUser(response.body.data.firebaseUid);
    await Employees.deleteOne(
      // eslint-disable-next-line no-underscore-dangle
      { _id: mongoose.Types.ObjectId(`${employeeId}`) },
    );
  });

  test(
    'response should return a 404 status after deleting the user with the id of employeeId',
    async () => {
      const response = await request(app)
        .delete(`/api/employees/${employeeId}`)
        .send();
      expect(response.status).toEqual(404);
    },
  );

  test('response should return a message like this: Employee not found', async () => {
    const response = await request(app)
      .delete(`/api/employees/${employeeId}`)
      .send();
    expect(response.body.message).toEqual('Employee not found');
  });
});
