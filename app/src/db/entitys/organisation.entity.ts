import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { InclusiveVolumeEntity } from './inclusiveVolume.entity';
import { PaymentEntity } from './payment.entity';
import { SimEntity } from './sim.entity';

@Entity('organisation')
export class OrganisationEntity {
  @PrimaryGeneratedColumn({ name: 'organisation_id' })
  organisationId: number;

  @Column()
  name: string;

  @OneToOne(
    () => InclusiveVolumeEntity,
    (inclusiveVolume) => inclusiveVolume.organisation,
    { cascade: true },
  )
  inclusiveVolume: Promise<InclusiveVolumeEntity>;

  @OneToMany(() => SimEntity, (sim) => sim.organisation, {
    cascade: true,
  })
  sims: Promise<SimEntity[]>;

  @OneToMany(() => PaymentEntity, (payment) => payment.organisation, {
    cascade: true,
  })
  payments: Promise<PaymentEntity[]>;
}
