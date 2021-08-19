import { GenericApi } from "../../core/api/generic-api";
import { CustomerGeneralData } from "../interfaces/customer-general-data";

export class CustomerApi extends GenericApi<CustomerGeneralData> {}

export const customerApi = new CustomerApi('api/customers');