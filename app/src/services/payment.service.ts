import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../db/entitys';
import { PaymentBody, SimPaymentInfo } from '../dto/payment.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repository: Repository<PaymentEntity>,
  ) {}
  async create(payment: PaymentBody): Promise<PaymentEntity> {
    return this.repository.save(payment);
  }

  async getOrganisationPayments(
    organisationId: number,
  ): Promise<SimPaymentInfo[]> {
    const res = await this.repository
      .createQueryBuilder('payment')
      .select('payment.sim_id', 'simId')
      .addSelect('SUM(payment.cost)', 'totalCost')
      .where('payment.organisation_id = :organisationId', {
        organisationId: organisationId,
      })
      .groupBy('payment.sim_id')
      .getRawMany<SimPaymentInfo>();
    return res.map((simPayment) => {
      return { ...simPayment, totalCost: Number(simPayment.totalCost) };
    });
  }
}
