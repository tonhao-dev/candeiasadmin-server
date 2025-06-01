import { faker } from '@faker-js/faker';
import { subYears } from 'date-fns';
import request from 'supertest';
import { app } from '../../app';
import db from '../../database/connection';
import { Genders } from '../../enum/gender';

describe('TeacherController', () => {
  describe('PATCH /people/:id/graduateToTeacher', () => {
    it('Deve promover um aluno para professor', async () => {
      const createStudentResponse = await request(app)
        .post('/people')
        .send({
          name: faker.person.fullName(),
          birthday: subYears(new Date(), 25).toISOString(),
          gender: Genders.Male,
          email: faker.internet.email(),
        })
        .set('Accept', 'application/json')
        .expect(201);

      const studentId = createStudentResponse.body.result;

      const graduateResponse = await request(app)
        .patch(`/people/${studentId}/graduateToTeacher`)
        .set('Accept', 'application/json')
        .expect(200);

      expect(graduateResponse.body.result).toBe(true);

      await db('person').where({ id: studentId }).del();
    });

    it('Deve retornar 400 ao tentar promover um ID inválido', async () => {
      const response = await request(app)
        .patch('/people/00000000-0000-0000-0000-000000000000/graduateToTeacher')
        .set('Accept', 'application/json')
        .expect(400);

      expect(response.body.result).toBe(false);
      expect(response.body.validations).toBeDefined();
    });
  });

  describe('GET /teachers', () => {
    it('Deve retornar a lista de professores', async () => {
      const response = await request(app)
        .get('/teachers')
        .set('Accept', 'application/json')
        .expect(200);

      expect(response.body.result).toBeInstanceOf(Array);
    });
  });

  describe('PATCH /teachers/:id/revokeTeacherStatus', () => {
    it('Deve remover o status de professor de um usuário', async () => {
      const createStudentResponse = await request(app)
        .post('/people')
        .send({
          name: faker.person.fullName(),
          birthday: subYears(new Date(), 25).toISOString(),
          gender: Genders.Male,
          email: faker.internet.email(),
        })
        .set('Accept', 'application/json')
        .expect(201);

      const studentId = createStudentResponse.body.result;

      await request(app)
        .patch(`/people/${studentId}/graduateToTeacher`)
        .set('Accept', 'application/json')
        .expect(200);

      const revokeResponse = await request(app)
        .patch(`/teachers/${studentId}/revokeTeacherStatus`)
        .set('Accept', 'application/json')
        .expect(200);

      expect(revokeResponse.body.result).toBe(true);

      await db('person').where({ id: studentId }).del();
    });

    it('Deve retornar 400 ao tentar remover status de um ID inválido', async () => {
      const response = await request(app)
        .patch('/teachers/00000000-0000-0000-0000-000000000000/revokeTeacherStatus')
        .set('Accept', 'application/json')
        .expect(400);

      expect(response.body.result).toBe(false);
      expect(response.body.validations).toBeDefined();
    });
  });
});
