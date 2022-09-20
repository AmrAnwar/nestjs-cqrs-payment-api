import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyExchangeEntity } from '../db/entitys';
import { Currency } from '../db/enums';
import { Repository } from 'typeorm';

@Injectable()
export class ExchangeCurrencyService {
  public defaultCurrency = process.env.DEFAULT_CURRENCY as Currency;
  constructor(
    @InjectRepository(CurrencyExchangeEntity)
    private readonly repository: Repository<CurrencyExchangeEntity>,
  ) {}
  async calculateFromEuroExchange(
    targetCurrency: Currency,
    priceInEuro: number,
  ): Promise<number> {
    const exchange = await this.repository.findOne({
      where: {
        fromCurrency: this.defaultCurrency,
        toCurrency: targetCurrency,
      },
    });
    return exchange.exchangeRate * priceInEuro;
  }
}
