import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CdrEntity, InclusiveVolumeEntity } from '../db/entitys';
import { CreateInclusiveVolumeBody } from '../dto/inclusiveVolume.dto';
import { Repository } from 'typeorm';

export type UpdatedInclusiveVolumeInfo = {
  cdrRemainingToPayVolume: number;
};

@Injectable()
export class InclusiveVolumeService {
  constructor(
    @InjectRepository(InclusiveVolumeEntity)
    private readonly repository: Repository<InclusiveVolumeEntity>,
  ) {}
  isValidVolume(volume: InclusiveVolumeEntity): boolean {
    return volume.remainingVolume > 0;
  }
  createVolume(dto: CreateInclusiveVolumeBody): Promise<InclusiveVolumeEntity> {
    return this.repository.save({ ...dto, remainingVolume: dto.initialVolume });
  }

  updateInclusiveVolume(
    cdr: CdrEntity,
    volume: InclusiveVolumeEntity,
  ): UpdatedInclusiveVolumeInfo {
    let cdrRemainingToPayVolume: number;
    if (volume.remainingVolume > cdr.volume) {
      cdrRemainingToPayVolume = 0;
      volume.remainingVolume = volume.remainingVolume - cdr.volume;
    } else {
      volume.remainingVolume = 0;
      cdrRemainingToPayVolume = cdr.volume - volume.remainingVolume;
    }
    // if (remainingVolume != volume.remainingVolume) {
    this.repository.update(volume.inclusiveVolumeId, volume);
    return {
      cdrRemainingToPayVolume,
    };
  }
}
