import request from 'supertest';
import Employees from '../models/Employees';
import employeesSeed from '../seed/employees';
import app from '../app';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

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
/*
describe('Get employee by id', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0e').send();
    expect(response.status).toEqual(200);
  });

  test('response should be false error', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0e').send();
    expect(response.error).not.toBeTruthy();
  });

  test('response should not empty', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0e').send();
    expect.arrayContaining(response.data);
  });

  test('response should return this particular employee', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0e').send();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data._id).toBe('6288fe568cb389708e53eb0e');
  });

  test('response should be a 400 status', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0f').send();
    expect(response.status).toBe(400);
  });

  test('response should be true error', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0f').send();
    expect(response.error).toBeTruthy();
  });

  test('response should be a message like this: missing id parameter', async () => {
    const response = await request(app).get('/api/employees/6288fe568cb389708e53eb0f').send();
    expect(response.message).toBe(response.data);
  });
});
/*
describe('Get employee by first name', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/api/employees/firstName/Puche').send();
    expect(response.status).toBe(200);
  });

  test('response should be a message like this: Employee with firstName Puche', async () => {
    const response = await request(app).get('/api/employees/firstName/Puche').send();
    expect(response.message).toBe('Employee with firstName Puche');
  });

  test('response should be false error', async () => {
    const response = await request(app).get('/api/employees/firstName/Puche').send();
    expect(response.error).not.toBeTruthy();
  });

  test('response should not empty', async () => {
    const response = await request(app).get('/api/employees/firstName/Puche').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should return this particular employee', async () => {
    const response = await request(app).get('/api/employees/firstName/Puche').send();
    expect(response.body.data.firstName).toBe('Puche');
  });

  test('response should be a 400 status', async () => {
    const response = await request(app).get('/api/employees/firstName/1Puche').send();
    expect(response.status).toBe(400);
  });

  test('response should be true error', async () => {
    const response = await request(app).get('/api/employees/firstName/1Puche').send();
    expect(response.error).toBeTruthy();
  });

  test('response should be a message like this: missing id parameter', async () => {
    const response = await request(app).get('/api/employees/firstName/1Puche').send();
    expect(response.message).toBe('missing firstName parameter');
  });
});

describe('get by lastName', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/active/active').send();
    expect(response.status).toBe(200);
  });

  test('response should be a message like this: Employee with lastName Lopez', async () => {
    const response = await request(app).get('/active/active').send();
    expect(response.message).toBe('Employee with lastName Lopez');
  });

  test('response should be false error', async () => {
    const response = await request(app).get('/active/active').send();
    expect(response.error).not.toBeTruthy();
  });

  test('response should not empty', async () => {
    const response = await request(app).get('/active/active').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should return this particular employee', async () => {
    const response = await request(app).get('/active/active').send();
    expect(response.body.data.lastName).toBe('Lopez');
  });

  test('response should be a 400 status', async () => {
    const response = await request(app).get('/lastName/1Lopez').send();
    expect(response.status).toBe(400);
  });

  test('response should be true error', async () => {
    const response = await request(app).get('/lastName/1Lopez').send();
    expect(response.error).toBeTruthy();
  });

  test('response should be a message like this: missing lastName parameter', async () => {
    const response = await request(app).get('/lastName/1Lopez').send();
    expect(response.message).toBe('missing firstName parameter');
  });
});

describe('get by active status', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/active/active').send();
    expect(response.status).toBe(200);
  });

  test('response should be a message like this: Employee with status active', async () => {
    const response = await request(app).get('/active/active').send();
    expect(response.message).toBe('Employee with status active');
  });

  test('response should be false error', async () => {
    const response = await request(app).get('/active/active').send();
    expect(response.error).not.toBeTruthy();
  });

  test('response should not empty', async () => {
    const response = await request(app).get('/active/active').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should be a 400 status', async () => {
    const response = await request(app).get('/active/activee').send();
    expect(response.status).toBe(400);
  });

  test('response should be true error', async () => {
    const response = await request(app).get('/active/activee').send();
    expect(response.error).toBeTruthy();
  });

  test('response should be a message like this: missing active parameter', async () => {
    const response = await request(app).get('/active/activee').send();
    expect(response.message).toBe('missing active parameter');
  });
}); */
