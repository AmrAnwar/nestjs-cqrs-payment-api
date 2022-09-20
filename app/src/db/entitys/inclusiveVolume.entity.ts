import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { OrganisationEntity } from './organisation.entity';

@Entity('inclusive_volume')
export class InclusiveVolumeEntity {
  @PrimaryGeneratedColumn({ name: 'volume_id' })
  inclusiveVolumeId: number;

  @Column({
    name: 'remaining_volume',
    type: 'decimal',
    precision: 14,
    scale: 6,
  })
  remainingVolume: number;

  @Column({ name: 'initial_volume', type: 'decimal', precision: 14, scale: 6 })
  initialVolume: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ name: 'organisation_id' })
  organisationId: number;

  @OneToOne(
    () => OrganisationEntity,
    (organisation) => organisation.inclusiveVolume,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'organisation_id' })
  organisation: OrganisationEntity;
}
