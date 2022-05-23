import request from 'supertest';
import app from '../app';
import timeSheets from '../models/Time-sheets';
import timeSheetSeed from '../seed/time-sheets';

beforeAll(async () => {
  await timeSheets.collection.insertMany(timeSheetSeed);
});

describe('GET /api/time-sheets', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/api/time-sheets').send();
    await expect(response.status).toBe(200);
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/api/time/sheets').send();
    await expect(response.status).toBe(404);
  });
  test('response should return false error', async () => {
    const response = await request(app).get('/api/timesheets').send();
    await expect(response.status).toBe(404);
  });
  test('response should return false error', async () => {
    const response = await request(app).get('/api').send();
    await expect(response.status).toBe(404);
  });
});

describe('POST /api/time-sheets', () => {
  test('New time-sheet created', async () => {
    const response = await request(app).post('/api/time-sheets').send({
      Task: {
        taskDate: '7/7/2021',
        workedHours: 50,
        description: 'Testing /post',
      },
      approved: true,
    });
    expect(response.status).toEqual(201);
  });
});
