import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Currency } from '../enums';

@Entity('currency_exchange')
export class CurrencyExchangeEntity {
  @PrimaryColumn({
    type: 'enum',
    enum: Currency,
    name: 'from_currency',
  })
  fromCurrency: Currency;

  @PrimaryColumn({
    type: 'enum',
    enum: Currency,
    name: 'to_currency',
  })
  toCurrency: Currency;

  @Column({ name: 'exchange_rate', type: 'decimal', precision: 14, scale: 6 })
  exchangeRate: number;
}
