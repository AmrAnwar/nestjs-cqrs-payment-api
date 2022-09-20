import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { commandHandlers } from './commands/handlers';
import { CreatePaymentHandler } from './commands/handlers/create-payment.handler';
import {
  CdrController,
  InclusiveVolumeController,
  OrganisationController,
} from './controllers';
import { AppController } from './controllers/app.controller';
import { DatabaseModule } from './db/database.module';
import { eventHandlers } from './events/handlers';
import { sagas } from './sagas';
import { services } from './services';

export const controllers = [
  OrganisationController,
  CdrController,
  InclusiveVolumeController,
  AppController,
];

@Module({
  imports: [CqrsModule, ConfigModule.forRoot(), DatabaseModule],
  controllers,
  providers: [
    ...services,
    ...eventHandlers,
    ...commandHandlers,
    CreatePaymentHandler,
    ...sagas,
  ],
})
export class AppModule {}
