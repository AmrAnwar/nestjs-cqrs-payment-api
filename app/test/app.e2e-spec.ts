import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { controllers } from '../src/app.module';
import { entities } from '../src/db/databaseProviders';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CurrencyExchangeEntity,
  OrganisationEntity,
  PaymentEntity,
  RateEntity,
  RateZoneEntity,
  SimEntity,
} from '../src/db/entitys';
import { services } from '../src/services';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCdrBody } from 'src/dto/cdr.dto';
import { randomUUID } from 'crypto';
import { Currency } from '../src/db/enums';
import { CreateInclusiveVolumeBody } from '../src/dto/inclusiveVolume.dto';

let app: INestApplication;
beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    exports: [TypeOrmModule],
    imports: [
      CqrsModule,
      TypeOrmModule.forFeature(entities),
      TypeOrmModule.forRoot({
        type: 'mariadb',
        host: 'localhost',
        port: 15005,
        username: 'root',
        password: process.env.MARIADB_ROOT_PASSWORD,
        database: 'testdb',
        entities,
        synchronize: true,
      }),
    ],
    controllers: controllers,
    providers: services,
  }).compile();
  app = moduleFixture.createNestApplication();
  await app.init();
});

afterEach(async () => {
  for (const entity of entities) {
    const repository = app.get(
      `${entity.name}Repository`,
    ) as Repository<unknown>;
    await repository.query(`DELETE from ${repository.metadata.tableName};`);
  }
});

afterAll(async () => {
  app.close();
});

describe('App Endpoints e2e', () => {
  let sim: SimEntity;
  let rateZone: RateZoneEntity;
  let organisation: OrganisationEntity;
  let payment: PaymentEntity;
  let organisationName: string;

  beforeEach(async () => {
    // Arrange
    organisationName = 'AmroOrganisation';
    const organisationRepository = app.get(
      `${OrganisationEntity.name}Repository`,
    ) as Repository<OrganisationEntity>;
    const simRepository = app.get(
      `${SimEntity.name}Repository`,
    ) as Repository<SimEntity>;
    const rateZoneRepository = app.get(
      `${RateZoneEntity.name}Repository`,
    ) as Repository<RateZoneEntity>;
    const rateRepository = app.get(
      `${RateEntity.name}Repository`,
    ) as Repository<RateEntity>;
    const paymentRepository = app.get(
      `${PaymentEntity.name}Repository`,
    ) as Repository<PaymentEntity>;

    // Act
    [organisation] = await organisationRepository.save([
      { name: organisationName },
    ]);
    [sim] = await simRepository.save([
      { organisation: organisation, iccid: randomUUID() },
    ]);
    [rateZone] = await rateZoneRepository.save([{ name: 'US' }]);
    await rateRepository.save([{ amountPerVolume: 2, rateZone: rateZone }]);
    [payment] = await paymentRepository.save([
      {
        organisationId: organisation.organisationId,
        simId: sim.simId,
        cost: 10,
      },
    ]);
  });

  it('/organisation/<id>/bill?currency=EUR (GET)', async () => {
    // Request
    const res = await request(app.getHttpServer())
      .get(`/organisation/${organisation.organisationId}/bill?currency=EUR`)
      .set('Accept', 'application/json')
      .expect(200);

    // Asserts
    expect(res.body).toEqual({
      allSimsCost: payment.cost,
      simCardsPaymentInfos: [
        {
          simId: sim.simId,
          totalCost: payment.cost,
        },
      ],
    });
  });

  it('/organisation/<id>/bill?currency=USD (GET)', async () => {
    const currencyRepository = app.get(
      `${CurrencyExchangeEntity.name}Repository`,
    ) as Repository<CurrencyExchangeEntity>;
    const [currencyExchange] = await currencyRepository.save([
      {
        fromCurrency: Currency.EUR,
        toCurrency: Currency.USD,
        exchangeRate: 2,
      },
    ]);
    // Request
    const res = await request(app.getHttpServer())
      .get(`/organisation/${organisation.organisationId}/bill?currency=USD`)
      .set('Accept', 'application/json')
      .expect(200);

    // Asserts
    expect(res.body).toEqual({
      allSimsCost: payment.cost * currencyExchange.exchangeRate,
      simCardsPaymentInfos: [
        {
          simId: sim.simId,
          totalCost: payment.cost * currencyExchange.exchangeRate,
        },
      ],
    });
  });

  it('/cdr (POST)', async () => {
    // Request
    const { body } = await request(app.getHttpServer())
      .post('/cdr')
      .send(<CreateCdrBody>{
        volume: 1,
        simId: sim.simId,
        rateZoneId: rateZone.rateZoneId,
      })
      .set('Accept', 'application/json')
      .expect(201);

    // Asserts
    expect(body).toEqual({
      volume: 1,
      cdrId: expect.any(Number),
      rateZoneId: rateZone.rateZoneId,
      timestamp: expect.any(String),
      simId: sim.simId,
    });
  });
  it('/organisation/<id> (GET)', async () => {
    // Request
    const { body } = await request(app.getHttpServer())
      .get(`/organisation/${organisation.organisationId}`)
      .set('Accept', 'application/json')
      .expect(200);

    // Asserts
    expect(body).toEqual({
      organisationId: expect.any(Number),
      name: organisationName,
    });
  });

  it('/inclusive-volume (POST)', async () => {
    // Request
    const { body } = await request(app.getHttpServer())
      .post(`/inclusive-volume`)
      .send(<CreateInclusiveVolumeBody>{
        organisationId: organisation.organisationId,
        initialVolume: 10,
      })
      .set('Accept', 'application/json');

    // Asserts
    expect(body).toEqual({
      initialVolume: 10,
      remainingVolume: 10,
      inclusiveVolumeId: expect.any(Number),
      organisationId: expect.any(Number),
      timestamp: expect.any(String),
    });
  });
});
