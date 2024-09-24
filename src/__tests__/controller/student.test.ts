import request from 'supertest';
import { app } from '../../server';

describe('POST /student', () => {
  it('should create a new student', function () {
    return request(app)
      .post('/student')
      .send({
        name: 'Luis Santiago',
        birthday: '2001-02-05T05:00:00.000Z',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('should return 400 if name is not provided', function () {
    return request(app)
      .post('/student')
      .send({
        birthday: '2001-02-05T05:00:00.000Z',
      })
      .set('Accept', 'application/json')
      .expect(400);
  });
});
