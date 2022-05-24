/* eslint-disable no-underscore-dangle */

import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import EmployeesSeed from '../seed/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(EmployeesSeed);
});

let employeeId;

// Javi
describe('Get all employees', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(response.status).toBe(200);
  });
});

// Javi
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

// Javi
describe('Edit employee', () => {
  test('response should be succesfull', async () => {
    const response = await request(app).put(`/api/employees/${employeeId}`).send({
      firstName: 'Pucheprueba',
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
    expect(response.body.message).toEqual('Employee updated');
    expect(response.status).toBe(200);
  });

  test('response should return a true error when no id is send', async () => {
    const response = await request(app).put('/api/employees/').send({});
    expect(response.error).toBeTruthy();
  });

  test('response should return a true error and 404 status when the id entered is not found', async () => {
    const response = await request(app).put('/api/employees/628c6962126e9522236c0481').send({
      firstName: 'Pucheprueba',
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
    expect(response.error).toBeTruthy();
    expect(response.status).toBe(404);
  });
});

// Javi
describe('Delete employee', () => {
  test('response should return a true error when no id is send', async () => {
    const response = await request(app).delete('/api/employees/').send();
    expect(response.error).toBeTruthy();
  });

  test('response should be successfull ', async () => {
    const response = await request(app).delete(`/api/employees/${employeeId}`).send();
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual(`Employee with id ${employeeId} deleted.`);
    expect(response.status).toBe(200);
  });

  test('response should return a 404 status after deleting the user with the id of employeeId', async () => {
    const response = await request(app).delete(`/api/employees/${employeeId}`).send();
    expect(response.status).toEqual(404);
  });

  test('response should also return "Employee not found"', async () => {
    const response = await request(app).delete(`/api/employees/${employeeId}`).send();
    expect(response.body.message).toEqual('Employee not found');
  });
});
