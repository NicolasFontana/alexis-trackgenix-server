import request from 'supertest';
import Projects from '../models/Projects';
import projectsSeed from '../seed/projects';
import app from '../app';

let projectId;
beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

describe('GET ALL project', () => {
  test('All projects list response succesfull', async () => {
    const response = await request(app).get('/api/projects').send();
    // i don't know why dthe .send() I can run it without it
    expect(response.body.message).toBe('Success!');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBeFalsy();
    // Can I do the test this way? or should I write test for each one? Nop, bad practice
  });
});

describe('GET BY ID project', () => {
  test('response succesfull', async () => {
    const response = await request(app).get('/api/projects/628ab4225aae617fa8002c21').send();
    expect(response.body.message).toBe('Project found');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
});

describe('GET BY project name', () => {
  test('response succesfull', async () => {
    const response = await request(app).get('/api/projects/name/Patata').send();
    expect(response.body.message).toBe('Project found!');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
});

describe('GET BY project name', () => {
  test('response succesfull', async () => {
    const response = await request(app).get('/api/projects/name/Patata').send();
    expect(response.body.message).toBe('Project found!');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
});

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
    // the one that Agustin sgested
  });
  test('Should not create a project', async () => {
    const response = await request(app).post('/api/projects').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Tito',
      // if i only took out employee i didnt get the error
    });
    expect(response.status).toBe(400);
  });
});

describe('DELETE proyects/id', () => {
  test('Should delete a proyect ', async () => {
    const response = await request(app).delete(`/api/projects/${projectId}`).send();
    expect(response.status).toEqual(200);
    expect(response.body.message).toBe('The project was successfully deleted');
  });
  test('Should NOT delete a proyect ', async () => {
    const response = await request(app).delete('/api/projects/verdura123').send();
    expect(response.status).toEqual(400);
    expect(response.body.message).toBe('id:verdura123 is not valid');
  });
});
