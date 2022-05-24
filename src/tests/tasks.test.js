import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import taskSeed from '../seed/tasks';

// let taskId;

beforeAll(async () => {
  await Tasks.collection.insertMany(taskSeed);
});

describe('GET /api/tasks', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/api/tasks').send();
    await expect(response.status).toBe(200);
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/api-tasks').send();
    await expect(response.status).toBe(404);
  });
});

// Test GET by Id by Fran
describe('GetById /api/tasks', () => {
  test('get task by id', async () => {
    const response = await request(app).get('/api/tasks/6289c467fc13ae72d60000ca').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('get task by id, incorrect id', async () => {
    const response = await request(app).get('/api/tasks/6280062d5f0b9b4131e527e4').send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('id not found');
  });
  test('get task by id, incorrect id format', async () => {
    const response = await request(app).get('/api/tasks/asd').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});

// Test GET by description by Fran
/*
describe('GetByDescription /api/tasks', () => {
  test('get task by description', async () => {
    const response = await request(app).get('/api/tasks/taskDescription/description');
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
});
*/
/*
// Test POST by Fran
describe('POST /api/tasks', () => {
  test('Create a task', async () => {
    const response = await request(app).post('api/tasks/').send({
      taskDate: '2022/03/20',
      workedHours: 11,
      description: 'Testing /post',
    });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    // taskId = response.body.data._id;
  });
}); */
/*
describe('PUT /api/tasks/:id', () => {
  test('New time-sheet created', async () => {
    const response = await request(app).post('/api/tasks/:id').send({ 
      taskId: '6289c467fc13ae72d60000bb',
      taskDate: '2022/09/11',
      workedHours: 55,
      description: 'Testing /post',

    });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    taskId = response.body.data._id;
  });

});
*/
// Test DELETE by Fran
/*
describe('DELETE /api/tasks', () => {
  test('Delete a task', async () => {
    // eslint-disable-next-line no-undef
    const response = await request(app).delete(`/api/tasks/${taskId}`).send();
    expect(response.status).toBe(204);
    expect(response.body.message).toBe('Task succesfully deleted');
  });
});
*/
