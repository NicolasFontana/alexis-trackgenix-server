import request from 'supertest';
import Employees from '../models/Employees';
import employeesSeed from '../seed/employees';
import app from '../app';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});
// GETS TEST BY MARTIN
describe('Get all employees', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(response.status).toBe(200);
  });

  test('response should be false error', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(response.error).not.toBeTruthy();
  });

  test('response should return at least one employee', async () => {
    const response = await request(app).get('/api/employees').send();
    expect.arrayContaining(response.data);
  });
});

describe('Get employee by id', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0e').send();
    expect(response.status).toEqual(200);
  });

  test('response should be false error', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0e').send();
    expect(response.error).not.toBeTruthy();
  });

  test('response should not be empty', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0e').send();
    expect.arrayContaining(response.data);
  });

  test('response should return this particular employee', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0e').send();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data._id).toBe('6288fe568cb389708e53eb0e');
  });

  test('response should be a 404 status', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0f').send();
    expect(response.status).toBe(404);
  });

  test('response should be true error', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0f').send();
    expect(response.error).toBeTruthy();
  });

  test('response should be a message like this: missing id parameter', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0f').send();
    expect(response.body.msg).toBe('missing id parameter');
  });
});

describe('Get employee by first name', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/api/employees/firstName/Puche').send();
    expect(response.status).toBe(200);
  });

  test('response should be a message like this: Employee with firstName Puche', async () => {
    const response = await request(app).get('/api/employees/firstName/Puche').send();
    expect(response.body.msg).toContain('Employee with firstName');
  });

  test('response should be false error', async () => {
    const response = await request(app).get('/api/employees/firstName/Puche').send();
    expect(response.error).not.toBeTruthy();
  });

  test('response should not empty', async () => {
    const response = await request(app).get('/api/employees/firstName/Puche').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should be a 404 status', async () => {
    const response = await request(app).get('/api/employees/firstName/1Puche').send();
    expect(response.status).toBe(404);
  });

  test('response should be true error', async () => {
    const response = await request(app).get('/api/employees/firstName/1Puche').send();
    expect(response.error).toBeTruthy();
  });

  test('response should be a message like this: missing firstName parameter', async () => {
    const response = await request(app).get('/api/employees/firstName/1Puche').send();
    expect(response.body.msg).toBe('missing firstName parameter');
  });
});

describe('get by lastName', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/api/employees/lastName/Lopez').send();
    expect(response.status).toBe(200);
  });

  test('response should be a message like this: Employee with lastName Lopez', async () => {
    const response = await request(app).get('/api/employees/lastName/Lopez').send();
    expect(response.body.msg).toBe('Employee with lastName Lopez');
  });

  test('response should be false error', async () => {
    const response = await request(app).get('/api/employees/lastName/Lopez').send();
    expect(response.error).not.toBeTruthy();
  });

  test('response should not be empty', async () => {
    const response = await request(app).get('/api/employees/lastName/Lopez').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should be a 404 status', async () => {
    const response = await request(app).get('/api/employees/lastName/1Lopez').send();
    expect(response.status).toBe(404);
  });

  test('response should be true error', async () => {
    const response = await request(app).get('/api/employees/lastName/1Lopez').send();
    expect(response.error).toBeTruthy();
  });

  test('response should be a message like this: missing lastName parameter', async () => {
    const response = await request(app).get('/api/employees/lastName/1Lopez').send();
    expect(response.body.msg).toBe('missing lastName parameter');
  });
});

describe('get by active status', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/api/employees/active/false').send();
    expect(response.status).toBe(200);
  });

  test('response should be a message like this: Employee with status false', async () => {
    const response = await request(app).get('/api/employees/active/false').send();
    expect(response.body.msg).toBe('Employee with status false');
  });

  test('response should be false error', async () => {
    const response = await request(app).get('/api/employees/active/false').send();
    expect(response.error).not.toBeTruthy();
  });

  test('response should not empty', async () => {
    const response = await request(app).get('/api/employees/active/false').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should be a 400 status', async () => {
    const response = await request(app).get('/api/employees/active/truue').send();
    expect(response.status).toBe(400);
  });

  test('response should be true error', async () => {
    const response = await request(app).get('/api/employees/active/true').send();
    expect(response.error).toBeTruthy();
  });

  test('response should be a message like this: missing active parameter', async () => {
    const response = await request(app).get('/api/employees/active/true').send();
    expect(response.body.msg).toBe('missing active parameter');
  });
});
// CREATE TESTS BY MARTIN
describe('create an employee', () => {
  test('Create an employee', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      lastName: 'Lopez',
      phone: 7761785000,
      email: 'juanssssopez@people.com',
      password: 'password123',
      active: false,
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Employee created');
    expect(response.body.error).toBeFalsy();
  });
  test('No first name error', async () => {
    const response = await request(app).post('/api/employees/').send({
      lastName: 'Lopez',
      phone: 7761785000,
      email: 'juanssssopez@people.com',
      password: 'password123',
      active: false,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Employee validation failed');
    expect(response.body.error).toBeTruthy();
  });
  test('No last name error', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      phone: 7761785000,
      email: 'juanssssopez@people.com',
      password: 'password123',
      active: false,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Employee validation failed');
    expect(response.body.error).toBeTruthy();
  });
  test('No phone error', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      lastName: 'Lopez',
      email: 'juanssssopez@people.com',
      password: 'password123',
      active: false,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Employee validation failed');
    expect(response.body.error).toBeTruthy();
  });
  test('No email error', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      lastName: 'Lopez',
      phone: 7761785000,
      password: 'password123',
      active: false,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Employee validation failed');
    expect(response.body.error).toBeTruthy();
  });
  test('No password error', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      lastName: 'Lopez',
      phone: 7761785000,
      email: 'juanssssopez@people.com',
      active: false,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Employee validation failed');
    expect(response.body.error).toBeTruthy();
  });
  test('No status error', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      lastName: 'Lopez',
      phone: 7761785000,
      email: 'juanssssopez@people.com',
      password: 'password123',
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Employee validation failed');
    expect(response.body.error).toBeTruthy();
  });
});
