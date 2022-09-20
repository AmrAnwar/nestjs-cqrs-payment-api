import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CdrEntity } from './cdr.entity';
import { RateEntity } from './rate.entity';

@Entity('ratezone')
export class RateZoneEntity {
  @PrimaryGeneratedColumn({ name: 'ratezone_id' })
  rateZoneId: number;

  @Column({ name: 'name' })
  name: string;

  @OneToOne(() => RateEntity, (rate) => rate.rateZone, { eager: true })
  rate?: RateEntity;

  @OneToMany(() => CdrEntity, (cdr) => cdr.rateZone)
  cdrs: CdrEntity[];
}
