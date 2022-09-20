import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as cli from 'cli-color';
import { CdrEntity, OrganisationEntity } from '../../db/entitys';
import { CdrService } from '../../services/cdr.service';
import { PaymentService } from '../../services/payment.service';
import { SimService } from '../../services/sim.service';
import { InclusiveVolumeService } from '../../services/volume.service';
import { CreatePaymentCommand } from '../impl/create-payment.command';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler
  implements ICommandHandler<CreatePaymentCommand>
{
  constructor(
    private readonly inclusiveVolumeService: InclusiveVolumeService,
    private readonly simService: SimService,
    private readonly paymentService: PaymentService,
    private readonly cdrService: CdrService,
  ) {}

  async execute(command: CreatePaymentCommand) {
    console.log(cli.redBright('[command]'), ' CreatePaymentCommand...');
    const cdr = await this.cdrService.get(command.cdrId);
    const organisation = await this.simService.getSimOrganisation(cdr.simId);
    const cost = await this.calculatePaymentCost(organisation, cdr);
    if (cost) {
      this.paymentService.create({
        cost: cost,
        organisationId: organisation.organisationId,
        simId: cdr.simId,
      });
    }
  }

  async calculatePaymentCost(organisation: OrganisationEntity, cdr: CdrEntity) {
    const volume = await organisation.inclusiveVolume;
    if (this.inclusiveVolumeService.isValidVolume(volume)) {
      const updatedInclusiveVolumeInfo =
        this.inclusiveVolumeService.updateInclusiveVolume(cdr, volume);
      const cdrRemainingToPayVolume =
        updatedInclusiveVolumeInfo.cdrRemainingToPayVolume;
      return await this.cdrService.getCdrCost(cdrRemainingToPayVolume, cdr);
    } else {
      return await this.cdrService.getCdrCost(cdr.volume, cdr);
    }
  }
}
