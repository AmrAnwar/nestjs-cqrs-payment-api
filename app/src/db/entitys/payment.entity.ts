import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { OrganisationEntity } from './organisation.entity';
import { SimEntity } from './sim.entity';

@Entity('payment', { orderBy: { timestamp: 'ASC' } })
export class PaymentEntity {
  @PrimaryGeneratedColumn({ name: 'payment_id' })
  paymentId: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 6,
  })
  cost: number;

  @Column({ name: 'sim_id' })
  simId: number;

  @Column({ name: 'organisation_id' })
  organisationId: number;

  @ManyToOne(() => SimEntity, (sim) => sim.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sim_id' })
  sim: SimEntity;

  @ManyToOne(
    () => OrganisationEntity,
    (organisation) => organisation.payments,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'organisation_id' })
  organisation: OrganisationEntity;
}
