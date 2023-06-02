import request from 'supertest';
import { createServer } from '../../src/server';

describe('Dev', () => {
  test('Get dev with id 1', async () => {
    const app = createServer({
        port: 3000,
        corsoptions: {
        },
        limiter: {
          time: 1000,
          max: 10,
          message: 'Too many requests',
        },
      });

    const res = await request(app).get('/api/devs/1');
    expect(res.body).toMatchObject({
        id: 1,
        name: 'Insomniac Games',
      });
  });
});
