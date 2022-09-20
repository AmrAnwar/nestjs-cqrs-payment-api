import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CdrEntity } from './cdr.entity';
import { OrganisationEntity } from './organisation.entity';
import { PaymentEntity } from './payment.entity';

@Entity('sim')
export class SimEntity {
  @PrimaryGeneratedColumn({ name: 'sim_id' })
  simId: number;

  @Column()
  iccid: string;

  @CreateDateColumn({ name: 'registered_at' })
  registeredAt: Date;

  @ManyToOne(() => OrganisationEntity, (organisation) => organisation.sims, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organisation_id' })
  organisation: OrganisationEntity;

  @OneToMany(() => CdrEntity, (cdr) => cdr.sim)
  cdrs: Promise<CdrEntity[]>;

  @OneToMany(() => PaymentEntity, (payment) => payment.sim)
  payments: Promise<PaymentEntity[]>;
}
