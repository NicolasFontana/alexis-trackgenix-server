import mongoose from 'mongoose';
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
  test.skip('All projects list response succesfull', async () => {
    const response = await request(app).get('/api/projects').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Projects found');
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
    const response = await request(app)
      .get('/api/projects/628ab4225aae617fa8002c21')
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      'Project with id 628ab4225aae617fa8002c21 found',
    );
    expect(response.body.error).toBeFalsy();
  });
  test('id not found', async () => {
    const response = await request(app)
      .get('/api/projects/628ab4225aae617fa8002c22')
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.body.data).toEqual({});
    expect(response.body.message).toBe(
      'Project with id 628ab4225aae617fa8002c22 not found',
    );
    expect(response.body.error).toBeTruthy();
  });
  test('id not valid', async () => {
    const response = await request(app).get('/api/projects/calabaza54').send();
    expect(response.statusCode).toBe(400);
    expect(response.body.message.length).toBeGreaterThan(10);
    expect(response.body.error).toBeTruthy();
  });
});

// Get by project name by Ana
describe('GET BY project name', () => {
  test('response succesfull', async () => {
    const response = await request(app).get('/api/projects/name/Patata').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Project with name Patata found');
    expect(response.body.error).toBeFalsy();
  });
  test('name not found', async () => {
    const response = await request(app)
      .get('/api/projects/name/perejil')
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Project with name perejil not found');
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
  });
  test('invalid path', async () => {
    const response = await request(app).get('/api/projects/name/').send();
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
  });
});

// Get project by client name by Ana
describe('GET BY client name', () => {
  test('response succesfull', async () => {
    const response = await request(app).get('/api/projects/client/Tito').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Project with client Tito found');
    expect(response.body.error).toBeFalsy();
  });
  test('name not found', async () => {
    const response = await request(app)
      .get('/api/projects/client/berenjena')
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe(
      'Project with client berenjena not found',
    );
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
  });
  test('invalid path', async () => {
    const response = await request(app).get('/api/projects/client/').send();
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
  });
});
// Get proyect by status by Ana
describe('GET BY project status', () => {
  test('response succesfull', async () => {
    const response = await request(app).get('/api/projects/status/true').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Projects found!');
    expect(response.body.error).toBeFalsy();
  });
  test('status not found', async () => {
    const response = await request(app)
      .get('/api/projects/status/false')
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('No projects found');
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
  });
  test('invalid path', async () => {
    const response = await request(app)
      .get('/api/projects/status/falsy')
      .send();
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
  });
});

// Create project by Ana
describe('POST projects/create', () => {
  test('Should create a project', async () => {
    const response = await request(app)
      .post('/api/projects')
      .send({
        name: 'Patata',
        description: 'This is a descriptive String',
        startDate: '2020-04-03',
        endDate: '2022-04-03',
        clientName: 'Tito',
        active: true,
        isDeleted: false,
        members: [
          {
            employeeId: '628ab4485a6f0bba3f2585d3',
            role: 'DEV',
            rate: 24,
          },
        ],
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Project created');
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('name', 'Patata');
    // leaving an example that fails:
    // expect(response.body.data).toHaveProperty('name', 'Patatas fritas');
    expect(response.body.data).toHaveProperty(
      'description',
      'This is a descriptive String',
    );
    expect(response.body.error).toBeFalsy();
    // eslint-disable-next-line no-underscore-dangle
    projectId = response.body.data._id;
  });
  test('Should create project(member is not required)', async () => {
    const response = await request(app).post('/api/projects').send({
      name: 'Patata',
      description: 'This is a descriptive String',
      startDate: '2020-04-03',
      endDate: '2022-04-03',
      clientName: 'Tito',
      active: true,
      isDeleted: false,
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Project created');
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('name', 'Patata');
    expect(response.body.error).toBeFalsy();
  });
  test('Missing required fields: Should not create a project due to failed validation', async () => {
    const response = await request(app)
      .post('/api/projects')
      .send({
        name: 'Patata',
        description: 'This is a descriptive String',
        startDate: '2020-04-03',
        endDate: '2022-04-03',
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
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe('Client name is a required field');
  });
  test('Name too short: Should not create a project due to failed validation', async () => {
    const response = await request(app)
      .post('/api/projects')
      .send({
        name: 'P',
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
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe(
      'Invalid project name, it must contain more than 3 letters',
    );
  });
  test('Invalid date: Should not create a project due to failed validation', async () => {
    const response = await request(app)
      .post('/api/projects')
      .send({
        name: 'Pasd',
        description: 'This is a descriptive String',
        startDate: '04-2020-03',
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
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe('"startDate" must be a valid date');
  });
});

// Delete projects by Ana
describe('DELETE proyects/id', () => {
  test('Should delete a proyect ', async () => {
    const response = await request(app)
      .delete(`/api/projects/${projectId}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('_id', projectId);
    expect(response.body.message).toBe('The project was successfully deleted');
    expect(response.body.error).toBeFalsy();
    await Projects.deleteOne(
      // eslint-disable-next-line no-underscore-dangle
      { _id: mongoose.Types.ObjectId(`${projectId}`) },
    );
  });

  test('id not found', async () => {
    const response = await request(app)
      .delete('/api/projects/628ab4225aae617fa8002c22')
      .send();
    expect(response.status).toEqual(404);
    expect(response.body.message).toBe(
      'Id 628ab4225aae617fa8002c22 does not exist',
    );
    expect(response.body.data).toEqual({});
    expect(response.body.error).toBeTruthy();
  });
  test('Id with invalid format error', async () => {
    const response = await request(app)
      .delete('/api/projects/verdura123')
      .send();
    expect(response.status).toEqual(400);
    expect(response.body.message).toBe('id:verdura123 is not valid');
    expect(response.body.error).toBeTruthy();
  });
  test('invalid path', async () => {
    const response = await request(app).delete('/api/project/hgcuylu').send();
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeUndefined();
  });
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
  test("ERROR - UNSPECIFIED PERIOD. Should return 'You must specify initDate and/or endDate!'", async () => {
    const response = await request(app).get('/api/projects/date').send({
      startDate: '',
      endDate: '',
    });
    expect(response.body.message).toEqual(
      'You must specify initDate and/or endDate!',
    );
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
    const response = await request(app)
      .put('/theRouteisWrong')
      .send({
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
    const response = await request(app)
      .put('/628ab4225aae617fa8002c27')
      .send({
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
  test("WRONG ID. Should return 'Project not found'", async () => {
    const response = await request(app)
      .put('/api/projects/628ab4225aae617fa8002c27')
      .send({
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
    const response = await request(app)
      .put('/api/projects/628ab4225aae617fa8002c27')
      .send({
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
    const response = await request(app)
      .put('/api/projects/628ab4225aae617fa8002c27')
      .send({
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
  test("SUCCESS, message should return 'The project has updated successfully'", async () => {
    const response = await request(app)
      .put('/api/projects/628ab4225aae617fa8002c21')
      .send({
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
    expect(response.body.message).toEqual(
      'The project has been updated successfully',
    );
  });
  test('SUCCESS, it has to be a status 200', async () => {
    const response = await request(app)
      .put('/api/projects/628ab4225aae617fa8002c21')
      .send({
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
    const response = await request(app)
      .put('/api/projects/628ab4225aae617fa8002c21')
      .send({
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
    const response = await request(app)
      .put('/api/projects/628ab4225aae617fa8002c21')
      .send({
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
    const response = await request(app)
      .put('/api/projects/123abc-.')
      .send({
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
    const response = await request(app)
      .put('/api/projects/123abc-.')
      .send({
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
    const response = await request(app)
      .put('/api/projects/123abc-.')
      .send({
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
    const response = await request(app)
      .put('/api/projects/123abc-.')
      .send({
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
