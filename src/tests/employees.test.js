/* eslint-disable no-underscore-dangle */

import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import EmployeesSeed from '../seed/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(EmployeesSeed);
});

let employeeId;

describe('Get all employees', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(response.status).toBe(200);
  });
});

describe('Create employee', () => {
  test('response should return a false error', async () => {
    const response = await request(app).post('/api/employees/').send({
      firstName: 'Puche',
      lastName: 'Lopez',
      phone: 7761785000,
      email: 'juanssssopez@people.com.cn',
      password: 'tuvieja123123',
      active: false,
      projects: [
        '62883891a6c3e40d965f7f8c',
      ],
      timeSheets: [
        '62883891a6c3e40d965f7f8c',
      ],
    });
    expect(response.body.error).toBeFalsy();
    employeeId = response.body.data._id;
  });
});

describe('Delete employee', () => {
  test('response should return a true error', async () => {
    const response = await request(app).delete('/api/employees/').send();
    expect(response.error).toBeTruthy();
  });

  test('response should be successfull ', async () => {
    const response = await request(app).delete(`/api/employees/${employeeId}`).send();
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual(`Employee id: ${employeeId} deleted.`);
    expect(response.status).toBe(200);
    employeeId = response.body.data._id;
  });

  test('response should now return a 404 status', async () => {
    const response = await request(app).delete(`/api/employees/${employeeId}`).send();
    expect(response.status).toEqual(404);
  });

  test('response should now return "Employee not found"', async () => {
    const response = await request(app).delete(`/api/employees/${employeeId}`).send();
    expect(response.body.message).toEqual('Employee not found');
  });
});
