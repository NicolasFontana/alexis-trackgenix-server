import request from 'supertest';
import app from '../app';
import timeSheets from '../models/Time-sheets';
import timeSheetSeed from '../seed/time-sheets';

beforeAll(async () => {
  await timeSheets.collection.insertMany(timeSheetSeed);
});

describe('GET /api/time-sheets', () => {
  test('Response should return a status 200', async () => {
    const response = await request(app).get('/api/time-sheets').send();
    expect(response.error).toBeFalsy();
  });
});
