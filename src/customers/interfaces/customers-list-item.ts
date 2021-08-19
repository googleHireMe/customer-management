import { GoodsRange } from "../enums/goods-range";
import { PaymentType } from "../enums/payment-type";
import { SigmaUsageOptions } from "../enums/sigma-usage-options";

export interface CustomersListItem {
  id: number;
  registrationDate: Date | string;
  title: string;
  internalTitle: string;
  margin: number;
  phone: string;
  email: string;
  deliveryAddress: string;
  contractNumber: string;
  contractDate: string;
  balance: number;
  goodsRange: GoodsRange[];
  paymentTypes: PaymentType[];
  sigmaUsage: SigmaUsageOptions[];
  status: boolean;
  comments: string;
  creditLimit: number;
}