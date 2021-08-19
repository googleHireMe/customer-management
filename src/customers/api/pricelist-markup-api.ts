import { PricelistMarkup } from "../interfaces/customer-pricelist-markup";
import { CustomerDependentApi } from "./customer-dependent-api";

export const pricelistMarkupApi = new CustomerDependentApi<PricelistMarkup>('api/customers', 'pricelist-markups');