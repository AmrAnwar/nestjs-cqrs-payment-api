import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { RateZoneEntity } from './ratezone.entity';

@Entity('rate')
export class RateEntity {
  @PrimaryGeneratedColumn({ name: 'rate_id' })
  rateId: number;

  @Column({
    name: 'amount_per_volume',
    type: 'decimal',
    precision: 14,
    scale: 6,
  })
  amountPerVolume: number;

  @OneToOne(() => RateZoneEntity, (rateZone) => rateZone.rate)
  @JoinColumn({ name: 'ratezone_id' })
  rateZone: RateZoneEntity;
}
