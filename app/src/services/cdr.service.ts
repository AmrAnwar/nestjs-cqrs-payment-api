import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CdrEntity } from '../db/entitys';
import { CreateCdrBody } from '../dto/cdr.dto';
import { Repository } from 'typeorm';

export type InclusiveVolumeCdrInfo = {
  cdr: CdrEntity;
  volume: number;
  inclusiveConsumedVolume: number;
  remainingVolume: number;
};

@Injectable()
export class CdrService {
  constructor(
    @InjectRepository(CdrEntity)
    private readonly repository: Repository<CdrEntity>,
  ) {}

  get(cdrId: number): Promise<CdrEntity> {
    return this.repository.findOne({
      where: { cdrId: cdrId },
    });
  }

  async getCdrCost(volume: number, cdr: CdrEntity) {
    const ratezone = await cdr.rateZone;
    return volume * ratezone.rate.amountPerVolume;
  }

  async createCdr(createCdrBody: CreateCdrBody): Promise<CdrEntity> {
    return await this.repository.save(<CdrEntity>{
      simId: createCdrBody.simId,
      volume: createCdrBody.volume,
      rateZoneId: createCdrBody.rateZoneId,
    });
  }
}
