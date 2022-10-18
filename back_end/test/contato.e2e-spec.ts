import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ContatoModule } from '../src/modules/contato/contato.module';
import { CreateContatoDto } from '../src/modules/contato/dto/create-contato.dto';

const contatoCreate: CreateContatoDto = {
  nome: 'developer',
  telefone: '123456789',
  email: 'yuri@gmail.com',
  senha: '123456',
  ativo: true,
};

describe('Test Contato API e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ContatoModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST should be possible to create a new contato`, () => {
    return request(app.getHttpServer())
      .post('/contato')
      .send(contatoCreate)
      .then((response) => {
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('id');
      });
  });

  it(`/POST should not be possible to create a new contato if this already exists`, () => {
    return request(app.getHttpServer())
      .post('/contato')
      .send(contatoCreate)
      .then((response) => {
        expect(response.statusCode).toEqual(409);
        expect(response.body.message).toEqual('Contact already exists');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
