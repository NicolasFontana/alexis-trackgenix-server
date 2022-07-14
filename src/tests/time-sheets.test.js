import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import timeSheetSeed from '../seed/time-sheets';
import TimeSheets from '../models/Time-sheets';

let timesheetId;

beforeAll(async () => {
  await TimeSheets.collection.insertMany(timeSheetSeed);
});

// Test for GET method by Fer
// Test for GET method by Fer
describe('GET /api/time-sheets', () => {
  test.skip('Response should return a 200 status', async () => {
    const response = await request(app).get('/api/time-sheets').send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Time-Sheets');
    expect(response.body.data).toEqual(expect.any(Object));
    expect(response.body.error).toBeFalsy();
  });
  test('Wrong path', async () => {
    const response = await request(app).get('/api/time/sheets').send();
    expect(response.status).toBe(404);
  });
  test('Wrong path', async () => {
    const response = await request(app).get('/api/timesheets').send();
    expect(response.status).toBe(404);
  });
  test('Wrong path', async () => {
    const response = await request(app).get('/api').send();
    expect(response.status).toBe(404);
  });
});

// Test for CREATE method by Fer
describe('POST /api/time-sheets', () => {
  test('New time-sheet created', async () => {
    const response = await request(app)
      .post('/api/time-sheets')
      .send({
        projectId: '6289c467fc13ae72d60000c9',
        Task: [
          {
            taskId: '6289c467fc13ae72d60000cb',
          },
        ],
        approved: true,
        isDeleted: false,
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Timesheet created');
    expect(response.body.data).toEqual(expect.any(Object));
    expect(response.body.error).toBeFalsy();
    // eslint-disable-next-line no-underscore-dangle
    timesheetId = response.body.data._id;
  });
  test('Should fill all required fields', async () => {
    const response = await request(app)
      .post('/api/time-sheets')
      .send({
        projectId: '6289c467fc13ae72d60000c9',
        Task: [
          {
            taskId: '6289c467fc13ae72d60000cb',
          },
        ],
      });
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe('"approved" is required');
  });
  test('Must not pass projectId validation', async () => {
    const response = await request(app)
      .post('/api/time-sheets')
      .send({
        projectId: '6289c467fc13ae72d',
        Task: [
          {
            taskId: '6289c467fc13ae72d60000cb',
          },
        ],
        approved: true,
      });
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe(
      'Invalid project id, it must contain 24 characters',
    );
  });
  test('Must not pass taskId validation', async () => {
    const response = await request(app)
      .post('/api/time-sheets')
      .send({
        projectId: '6289c467fc13ae72d60000c9',
        Task: [
          {
            taskId: '6289c467fc13ae7',
          },
        ],
        approved: true,
      });
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe(
      'Invalid task id, it must contain 24 characters',
    );
  });
});

// Test for GET by Id by Fran
describe('GetById /api/time-sheets/:id', () => {
  test('get by Id', async () => {
    const response = await request(app)
      .get('/api/time-sheets/6289c467fc13ae72d60000c7')
      .send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('get incorret id', async () => {
    const response = await request(app)
      .get('/api/time-sheets/6280062d5f0b9b4131e527e4')
      .send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Time Sheet not found');
  });
  test('get incorret id format', async () => {
    const response = await request(app).get('/api/time-sheets/628').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});

// Test for POST method by Mati & Fran
describe('POST /api/time-sheets', () => {
  test('New time-sheet created', async () => {
    const response = await request(app)
      .post('/api/time-sheets')
      .send({
        projectId: '6289c467fc13ae72d60000c9',
        Task: [
          {
            taskId: '6289c467fc13ae72d60000cb',
          },
        ],
        approved: true,
        isDeleted: false,
      });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    timesheetId = response.body.data._id;
  });
});

// Test for PUT method by Fran

describe('Update timesheet', () => {
  test('Should update a timesheet', async () => {
    const response = await request(app)
      .put(`/api/time-sheets/${timesheetId}`)
      .send({
        projectId: '6289c467fc13ae72d6000054',
        Task: [
          {
            taskId: '6289c467fc13ae72d60000cc',
          },
        ],
        approved: true,
      });
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });

  test('incorrect format id', async () => {
    const response = await request(app)
      .post('/api/time-sheets/628b9ce3b61')
      .send();
    expect(response.status).toBe(404);
  });

  test('With an incompletes body fields the response should return a status 404', async () => {
    const response = await request(app)
      .post(`/api/time-sheets/${timesheetId}`)
      .send({
        projectId: '',
        Task: [
          {
            taskId: '',
          },
        ],
        approved: true,
      });
    expect(response.status).toBe(404);
  });
});

// Test for DELETE method by Fer & Fran
describe('Delete timesheet', () => {
  test('Should delete a timesheet', async () => {
    // eslint-disable-next-line no-undef
    const response = await request(app)
      .delete(`/api/time-sheets/${timesheetId}`)
      .send();
    expect(response.status).toEqual(200);
    expect(response.body.message).toBe(
      `The ${timesheetId} timesheet has been susccesfully deleted`,
    );
    await TimeSheets.deleteOne(
      // eslint-disable-next-line no-underscore-dangle
      { _id: mongoose.Types.ObjectId(`${timesheetId}`) },
    );
  });
  test('Should not delete a timesheet ', async () => {
    const response = await request(app)
      .delete('/api/time-sheets/6280062d5f0b9b4131e527e4')
      .send();
    expect(response.status).toEqual(404);
    expect(response.body.message).toBe(
      'There is no timesheet with this Id 6280062d5f0b9b4131e527e4',
    );
  });
  test('Incorrect Id format', async () => {
    const response = await request(app).delete('/api/time-sheets/asd').send();
    expect(response.status).toEqual(400);
    expect(response.body.message).toBe('An error has ocurred');
  });
});
