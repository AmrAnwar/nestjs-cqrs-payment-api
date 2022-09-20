import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganisationEntity } from '../db/entitys';
import { Currency } from '../db/enums';
import { Repository } from 'typeorm';
import { ExchangeCurrencyService } from './currencyExchange.service';
import { PaymentService } from './payment.service';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectRepository(OrganisationEntity)
    private readonly repository: Repository<OrganisationEntity>,
    private readonly paymentService: PaymentService,
    private readonly currencyExchange: ExchangeCurrencyService,
  ) {}

  get(organisationId: number): Promise<OrganisationEntity> {
    return this.repository.findOne({
      where: { organisationId: organisationId },
    });
  }

  async calculateBill(organisationId: number, currency: Currency) {
    const simCardsPaymentInfos =
      await this.paymentService.getOrganisationPayments(organisationId);
    let allSimsCost = simCardsPaymentInfos.reduce<number>(
      (cost, simPaymentInfo) => {
        return cost + simPaymentInfo.totalCost;
      },
      0,
    );
    if (currency != process.env.DEFAULT_CURRENCY) {
      await Promise.all(
        simCardsPaymentInfos.map(async (simPayment) => {
          simPayment.totalCost =
            await this.currencyExchange.calculateFromEuroExchange(
              currency,
              simPayment.totalCost,
            );
        }),
      );
      allSimsCost = await this.currencyExchange.calculateFromEuroExchange(
        currency,
        allSimsCost,
      );
    }
    return {
      simCardsPaymentInfos,
      allSimsCost,
    };
  }
}
