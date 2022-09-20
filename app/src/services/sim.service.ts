import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganisationEntity, SimEntity } from '../db/entitys';
import { Repository } from 'typeorm';

@Injectable()
export class SimService {
  constructor(
    @InjectRepository(SimEntity)
    private readonly repository: Repository<SimEntity>,
  ) {}
  async getSimOrganisation(simId: number): Promise<OrganisationEntity> {
    const sim = await this.repository.findOne({
      where: { simId: simId },
      relations: {
        organisation: true,
      },
    });
    return sim.organisation;
  }
}
