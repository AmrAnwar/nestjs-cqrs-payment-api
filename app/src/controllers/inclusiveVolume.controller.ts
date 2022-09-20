import { Body, Controller, Post } from '@nestjs/common';
import { CreateInclusiveVolumeBody } from '../dto/inclusiveVolume.dto';
import { InclusiveVolumeService } from '../services/volume.service';

@Controller({ path: 'inclusive-volume' })
export class InclusiveVolumeController {
  constructor(private readonly service: InclusiveVolumeService) {}

  @Post()
  async post(@Body() dto: CreateInclusiveVolumeBody) {
    return await this.service.createVolume(dto);
  }
}
