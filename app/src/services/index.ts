import { AppService } from './app.service';
import { CdrService } from './cdr.service';
import { ExchangeCurrencyService } from './currencyExchange.service';
import { OrganisationService } from './orgranization.service';
import { PaymentService } from './payment.service';
import { SimService } from './sim.service';
import { InclusiveVolumeService } from './volume.service';

export const services = [
  AppService,
  OrganisationService,
  CdrService,
  InclusiveVolumeService,
  PaymentService,
  ExchangeCurrencyService,
  SimService,
];
