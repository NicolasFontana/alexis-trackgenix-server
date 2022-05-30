import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import taskSeed from '../seed/tasks';

let taskId;

beforeAll(async () => {
  await Tasks.collection.insertMany(taskSeed);
});

// Test for GET all by Fer;

describe('GET /api/tasks', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/api/tasks').send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('All tasks');
    expect(response.body.data).toEqual(expect.any(Object));
    expect(response.body.error).toBeFalsy();
  });

  test('Wrong path', async () => {
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
describe('GetByDescription /api/tasks', () => {
  test('get task by description', async () => {
    const response = await request(app).get('/api/tasks/taskDescription/description');
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
  });
  test('get task by description not found', async () => {
    const response = await request(app).get('/api/tasks/taskDescription/d');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
  });
  test('get task by description no description', async () => {
    const response = await request(app).get('/api/tasks/taskDescription/');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
  });
});

// Test POST by Fran
describe('POST /api/tasks', () => {
  test('Create a task', async () => {
    const response = await request(app).post('/api/tasks/').send({
      taskDate: '2022/03/20',
      workedHours: 11,
      description: 'Testing /post',
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Task created');
    expect(response.body.error).toBe(false);
    // eslint-disable-next-line no-underscore-dangle
    taskId = response.body.data._id;
  });
  test('Create task, no date', async () => {
    const response = await request(app).post('/api/tasks/').send({
      workedHours: 11,
      description: 'Testing /post',
    });
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe('\"taskDate\" is required');
  });
  test('Create task, no worked hours', async () => {
    const response = await request(app).post('/api/tasks/').send({
      taskDate: '2022/03/20',
      description: 'Testing /post',
    });
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe('\"workedHours\" is required');
  });
  test('Create a task, no description', async () => {
    const response = await request(app).post('/api/tasks/').send({
      taskDate: '2022/03/20',
      workedHours: 11,
    });
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe('\"description\" is required');
  });
});

// Test UPDATE by Fran
describe('UPDATE /api/tasks', () => {
  test('Update a task', async () => {
    const response = await request(app).put(`/api/tasks/${taskId}`).send({
      taskDate: '2021/04/10',
      workedHours: 15,
      description: 'Testing /put',
    });
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
  });
  test('Update a task, bad id', async () => {
    const response = await request(app).put('/api/tasks/6280062d5f0b9b4131e527e4').send({
      taskDate: '2021/04/10',
      workedHours: 15,
      description: 'Testing /put',
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task not found');
    expect(response.body.error).toBe(true);
  });
  test('Update a task, bad id format', async () => {
    const response = await request(app).put('/api/tasks/6280').send({
      taskDate: '2021/04/10',
      workedHours: 15,
      description: 'Testing /put',
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('An error has ocurred');
    expect(response.body.error).toBe(true);
  });
});

// Test DELETE by Fran
describe('DELETE /api/tasks', () => {
  test('Delete a task', async () => {
    // eslint-disable-next-line no-undef
    const response = await request(app).delete(`/api/tasks/${taskId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task succesfully deleted');
    expect(response.body.error).toBe(false);
  });
  test('Delete task, incorrect id', async () => {
    const response = await request(app).delete('/api/tasks/6280062d5f0b9b4131e527e4').send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task not found');
    expect(response.body.error).toBe(true);
  });
  test('Delete task, incorrect id format', async () => {
    const response = await request(app).delete('/api/tasks/628').send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('An error has ocurred');
    expect(response.body.error).toBe(true);
  });
});
