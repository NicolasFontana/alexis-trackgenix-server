import request from 'supertest';
import app from '../app';
import Proyects from '../models/Projects';
import proyectsSeed from '../seed/projects';

beforeAll(async () => {
  await Proyects.collection.insertMany(proyectsSeed);
});

// GET ALL BY PERIOD by Karu
/*
describe('GET BY DATE /project', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/api/projects/date').send();
    expect(response.status).toBe(200);
    // si pongo mal la ruta o sea un 404 falla o sea que esta bien
  });
  test('response should return a false error', async () => {
    const response = await request(app).get('/api/projects').send();
    expect(response.body.error).toBe(false);
    // si pongo false el test falla asi que ok
  });
  test('response should return at least one proyect', async () => {
    const response = await request(app).get('/api/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('response should return a message of success', async () => {
    const response = await request(app).get('/api/projects').send();
    expect(response.body.message).toBe('Success!');
  });
});
*/

describe('UPDATE /api/projects/:id', () => {
  test('Updated proyect response should return a status 200', async () => {
    const response = await request(app).put('/api/projects/628ab4225aae617fa8002c21').send(
      {
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
      },
    );
    expect(response.status).toBe(200);
  });
  test('Updated proyect response should return: The proyect has not been found because the ID does not exist', async () => {
    const response = await request(app).put('/api/projects/123').send(
      {
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
      },
    );
    expect(response.body.message).toEqual('Invalid format ID');
  });
});
