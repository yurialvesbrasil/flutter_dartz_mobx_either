import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CreateEmpresaDto } from '../src/modules/empresa/dto/create-empresa.dto';
import { EmpresaModule } from '../src/modules/empresa/empresa.module';

const empresaCreate: CreateEmpresaDto = {
  nome: 'developer',
  cnpj: '123456789',
};

describe('Test Empresa API e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EmpresaModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST should be possible to create a new empresa`, () => {
    return request(app.getHttpServer())
      .post('/empresa')
      .send(empresaCreate)
      .then((response) => {
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('id');
      });
  });

  it(`/POST should not be possible to create a new empresa if this already exists`, () => {
    return request(app.getHttpServer())
      .post('/empresa')
      .send(empresaCreate)
      .then((response) => {
        expect(response.statusCode).toEqual(409);
        expect(response.body.message).toEqual('Empresa already exists');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
