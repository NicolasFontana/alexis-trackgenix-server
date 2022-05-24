import request from 'supertest';
import Projects from '../models/Projects';
import projectsSeed from '../seed/projects';
import app from '../app';

let projectId;
beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

// Get all by Ana
describe('GET ALL project', () => {
  test('All projects list response succesfull', async () => {
    const response = await request(app).get('/api/projects').send();
    expect(response.body.message).toBe('Success!');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBeFalsy();
  });
  test('Wrong path', async () => {
    const response = await request(app).get('/api/project').send();
    expect(response.statusCode).toBe(404);
  });
});

// Get by Id by Ana
describe('GET BY ID project', () => {
  test('response succesfull', async () => {
    const response = await request(app).get('/api/projects/628ab4225aae617fa8002c21').send();
    expect(response.body.message).toBe('Project found');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('id not found', async () => {
    const response = await request(app).get('/api/projects/628ab4225aae617fa8002c22').send();
    expect(response.body.message).toBe('Project with id 628ab4225aae617fa8002c22 not found');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
  test('id not valid', async () => {
    const response = await request(app).get('/api/projects/calabaza54').send();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message.length).toBeGreaterThan(10);
  });
});

// Get by project name by Ana
describe('GET BY project name', () => {
  test('response succesfull', async () => {
    const response = await request(app).get('/api/projects/name/Patata').send();
    expect(response.body.message).toBe('Project found!');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('name not found', async () => {
    const response = await request(app).get('/api/projects/name/perejil').send();
    expect(response.body.message).toBe('No project with name: perejil');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toEqual({});
  });
  test('invalid path', async () => {
    const response = await request(app).get('/api/projects/name/').send();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toEqual({});
  });
});

// Get project by client name by Ana
describe('GET BY client name', () => {
  test('response succesfull', async () => {
    const response = await request(app).get('/api/projects/client/Tito').send();
    expect(response.body.message).toBe('Project found!');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('name not found', async () => {
    const response = await request(app).get('/api/projects/client/berenjena').send();
    expect(response.body.message).toBe('No project with client: berenjena');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toEqual({});
  });
  test('invalid path', async () => {
    const response = await request(app).get('/api/projects/client/').send();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toEqual({});
  });
});
// Get proyect by status by Ana
describe('GET BY project status', () => {
  test('response succesfull', async () => {
    const response = await request(app).get('/api/projects/status/true').send();
    expect(response.body.message).toBe('Projects found!');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('status not found', async () => {
    const response = await request(app).get('/api/projects/status/false').send();
    expect(response.body.message).toBe('No projects found');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toEqual({});
  });
  test('invalid path', async () => {
    const response = await request(app).get('/api/projects/status/falsy').send();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toEqual({});
  });
});

// Create project by Ana
describe('POST projects/create', () => {
  test('Should create a proyect', async () => {
    const response = await request(app).post('/api/projects').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Tito',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    projectId = response.body.data._id;
  });
  test('Message should indicate de creation of a new project and error false', async () => {
    const response = await request(app).post('/api/projects').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Tito',
      active: true,
      members: [
        {
          employeeId: '628ab4485a6f0bba3f2585d3',
          role: 'DEV',
          rate: 24,
        },
      ],
    });
    // expect(response.body.message).toEqual('Project created');
    expect(response.body.error).toBeFalsy();
    // expect(response.body.data).that.includes.all.keys(['name', 'description', 'active']);
    // doesn't reads includes
    // expect(response.body).to.have.property('active');
    // doesn't reads have
    // expect(response.body).should.have.lengthOf(7);
    // the one that Agustin suggested
  });
  test('Should not create a project', async () => {
    const response = await request(app).post('/api/projects').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Tito',
      // if i only took out employee i didnt get the error i think we should add a pm
    });
    expect(response.status).toBe(400);
  });
});

// Delete projects by Ana
describe('DELETE proyects/id', () => {
  test('Should delete a proyect ', async () => {
    const response = await request(app).delete(`/api/projects/${projectId}`).send();
    expect(response.status).toEqual(200);
    expect(response.body.message).toBe('The project was successfully deleted');
  });
  test('id not found', async () => {
    const response = await request(app).delete('/api/projects/628ab4225aae617fa8002c22').send();
    expect(response.status).toEqual(404);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Id 628ab4225aae617fa8002c22 does not exist');
  });
  test('Id with invalid format error', async () => {
    const response = await request(app).delete('/api/projects/verdura123').send();
    expect(response.status).toEqual(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('id:verdura123 is not valid');
  });
  test('invalid path', async () => {
    const response = await request(app).delete('/api/project/hgcuylu').send();
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeUndefined();
  });
});
