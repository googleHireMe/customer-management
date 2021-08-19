import { AppThunk } from "../../../store/store";
import { customerApi } from '../../api/customer-api';
import { pricelistMarkupApi } from "../../api/pricelist-markup-api";
import { CustomerGeneralData } from "../../interfaces/customer-general-data";
import { setCustomerGeneralData, setPricelistsMarkups } from "./customerSlice";

export const loadCustomer = (id: string): AppThunk => async dispatch => {
  const item = await customerApi.loadById(id);
  dispatch(setCustomerGeneralData(item));
};

export const createCustomer = (item: CustomerGeneralData): AppThunk => async dispatch => {
  const createdItem = await customerApi.create(item);
  dispatch(setCustomerGeneralData(createdItem));
};

export const updateCustomer = (item: CustomerGeneralData): AppThunk => async dispatch => {
  await customerApi.update(item.id, item);
  dispatch(setCustomerGeneralData(item));
};

export const loadPriceListsMarkups = (): AppThunk => async dispatch => {
  const items = await pricelistMarkupApi.loadList();
  dispatch(setPricelistsMarkups(items));
};