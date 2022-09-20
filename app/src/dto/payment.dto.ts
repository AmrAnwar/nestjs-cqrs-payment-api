export interface PaymentBody {
  organisationId: number;
  simId: number;
  cost: number;
}

export interface SimPaymentInfo {
  simId: number;
  totalCost: number;
}
