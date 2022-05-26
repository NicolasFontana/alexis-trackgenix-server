import request from 'supertest';
import app from '../app';
import Proyects from '../models/Projects';
import proyectsSeed from '../seed/projects';

beforeAll(async () => {
  await Proyects.collection.insertMany(proyectsSeed);
});

// GET BY PERIOD by Karu
describe('GET BY PERIOD /project', () => {
  // if there is end and init date
  test('SUCCESS. Should return a status 200', async () => {
    const response = await request(app).get('/api/projects/date').send({
      startDate: '2020-04-03',
      endDate: '2020-04-03',
    });
    expect(response.status).toBe(200);
  });
  test('SUCCESS. Should return message Project after {init} and before {end}.', async () => {
    const response = await request(app).get('/api/projects/date').send({
      startDate: '2020-04-03',
      endDate: '2020-04-03',
    });
    expect(response.body.message).toEqual(expect.any(String));
  });
  test('SUCCESS. Should return projects data', async () => {
    const response = await request(app).get('/api/projects/date').send({
      startDate: '2020-04-03',
      endDate: '2020-04-03',
    });
    expect(response.body.data).toEqual(expect.any(Object));
  });
  test('SUCCESS. Should return false error', async () => {
    const response = await request(app).get('/api/projects/date').send({
      startDate: '2020-04-03',
      endDate: '2020-04-03',
    });
    expect(response.body.error).toBeFalsy();
  });
  test('ERROR - UNSPECIFIED PERIOD. Should return a status 400', async () => {
    const response = await request(app).get('/api/projects/date').send({
      startDate: '',
      endDate: '',
    });
    expect(response.status).toBe(400);
  });
  test('ERROR - UNSPECIFIED PERIOD. Should return \'You must specify initDate and/or endDate!\'', async () => {
    const response = await request(app).get('/api/projects/date').send({
      startDate: '',
      endDate: '',
    });
    expect(response.body.message).toEqual('You must specify initDate and/or endDate!');
  });
  test('ERROR - UNSPECIFIED PERIOD. Should return for data an empty object', async () => {
    const response = await request(app).get('/api/projects/date').send({
      startDate: '',
      endDate: '',
    });
    expect(response.body.data).toEqual({});
  });
  test('ERROR - UNSPECIFIED PERIOD. Should return a true error', async () => {
    const response = await request(app).get('/api/projects/date').send({
      startDate: '',
      endDate: '',
    });
    expect(response.body.error).toBeTruthy();
  });
  test('WRONG ROUTE. Status should be 404', async () => {
    const response = await request(app).get('/api/proj/date').send({
      startDate: '2020-04-03',
      endDate: '2020-04-03',
    });
    expect(response.status).toBe(404);
  });
});
// UPDATE A PROYECT by Karu
describe('UPDATE /api/projects/:id', () => {
  test('WRONG ROUTE, should return a 404', async () => {
    const response = await request(app).put('/theRouteisWrong').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Pelusa',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.status).toBe(404);
  });
  test('WRONG ID, should return a 404', async () => {
    const response = await request(app).put('/628ab4225aae617fa8002c27').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Pelusa',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.status).toBe(404);
  });
  test('WRONG ID. Should return \'Project not found\'', async () => {
    const response = await request(app).put('/api/projects/628ab4225aae617fa8002c27').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Pelusa',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.body.message).toEqual('Project not found');
  });
  test('WRONG ID. Error should be true', async () => {
    const response = await request(app).put('/api/projects/628ab4225aae617fa8002c27').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Pelusa',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.body.error).toBeTruthy();
  });
  test('WRONG ID. Data should be an empty object', async () => {
    const response = await request(app).put('/api/projects/628ab4225aae617fa8002c27').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Pelusa',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.body.data).toStrictEqual({});
  });
  test('SUCCESS, message should return \'The project has updated successfully\'', async () => {
    const response = await request(app).put('/api/projects/628ab4225aae617fa8002c21').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Pelusa',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.body.message).toEqual('The project has updated successfully');
  });
  test('SUCCESS, it has to be a status 200', async () => {
    const response = await request(app).put('/api/projects/628ab4225aae617fa8002c21').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Pelusa',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.status).toBe(200);
  });
  test('SUCCESS. Error has to be false', async () => {
    const response = await request(app).put('/api/projects/628ab4225aae617fa8002c21').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Pelusa',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.body.error).toBeFalsy();
  });
  test('SUCCESS. Data should be the new data result', async () => {
    const response = await request(app).put('/api/projects/628ab4225aae617fa8002c21').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Pelusa',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.body.data).toEqual(expect.any(Object));
  });
  test('WRONG ID FORMAT. Should return message of invalid ID format', async () => {
    const response = await request(app).put('/api/projects/123abc-.').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Pelusa',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.body.message).toEqual('Invalid format ID');
  });
  test('WRONG ID FORMAT. Should return a status 400', async () => {
    const response = await request(app).put('/api/projects/123abc-.').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Pelusa',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.status).toBe(400);
  });
  test('WRONG ID FORMAT. Error has to be true', async () => {
    const response = await request(app).put('/api/projects/123abc-.').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Pelusa',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.body.error).toBeTruthy();
  });
  test('WRONG ID FORMAT. Data has to be the wrong ID in a string', async () => {
    const response = await request(app).put('/api/projects/123abc-.').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Pelusa',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.body.data).toEqual(expect.any(String));
  });
});
