import {
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Currency } from '../db/enums';
import { OrganisationService } from '../services/orgranization.service';

@Controller({ path: 'organisation' })
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.organisationService.get(id);
  }

  @Get(':id/bill')
  async getBill(
    @Param('id', ParseIntPipe) id: number,
    @Query('currency', new ParseEnumPipe(Currency))
    currency?: Currency,
  ) {
    return this.organisationService.calculateBill(id, currency);
  }
}
