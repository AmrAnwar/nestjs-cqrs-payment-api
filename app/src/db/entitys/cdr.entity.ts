import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { RateZoneEntity } from './ratezone.entity';
import { SimEntity } from './sim.entity';

@Entity('cdr', { orderBy: { timestamp: 'ASC' } })
export class CdrEntity {
  @PrimaryGeneratedColumn({ name: 'cdr_id' })
  cdrId: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: 'decimal', precision: 14, scale: 6 })
  volume: number;

  @Column({ name: 'sim_id' })
  simId: number;

  @Column({ name: 'ratezone_id' })
  rateZoneId: number;

  @ManyToOne(() => SimEntity, (sim) => sim.cdrs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sim_id' })
  sim: Promise<SimEntity>;

  @ManyToOne(() => RateZoneEntity, (rateZone) => rateZone.cdrs, { eager: true })
  @JoinColumn({ name: 'ratezone_id' })
  rateZone: Promise<RateZoneEntity>;
}
