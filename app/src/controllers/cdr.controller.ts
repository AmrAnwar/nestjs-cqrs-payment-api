import { Body, Controller, Post } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import type { CreateCdrBody } from '../dto/cdr.dto';
import { CreatedCdrEvent } from '../events/impl/cdrCreatedEvent.event';
import { CdrService } from '../services/cdr.service';

@Controller({ path: 'cdr' })
export class CdrController {
  constructor(
    private readonly cdrService: CdrService,
    private readonly eventBus: EventBus,
  ) {}

  @Post()
  async post(@Body() dto: CreateCdrBody) {
    const cdr = await this.cdrService.createCdr(dto);
    this.eventBus.publish(new CreatedCdrEvent(cdr.cdrId));
    return cdr;
  }
}
