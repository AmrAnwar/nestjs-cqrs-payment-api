import { SimPaymentInfo } from './payment.dto';

export type OrganisationBill = {
  simCardsPaymentInfos: SimPaymentInfo[];
  allSimsCost: number;
};
