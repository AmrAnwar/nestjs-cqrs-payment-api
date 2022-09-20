import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  SimEntity,
  OrganisationEntity,
  RateEntity,
  RateZoneEntity,
  CdrEntity,
  InclusiveVolumeEntity,
  PaymentEntity,
  CurrencyExchangeEntity,
} from './entitys';

export const entities = [
  OrganisationEntity,
  SimEntity,
  RateEntity,
  RateZoneEntity,
  CdrEntity,
  InclusiveVolumeEntity,
  PaymentEntity,
  CurrencyExchangeEntity,
];

export const dbConfigFactory: () => Promise<TypeOrmModuleOptions> =
  async () => ({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: process.env.MARIADB_ROOT_PASSWORD,
    database: 'emnify',
    entities,
    synchronize: true,
  });
