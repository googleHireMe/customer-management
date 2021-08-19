import { AppThunk } from "../../../store/store";
import { setCustomersList, removeCustomer } from "./customersListSlice";
import { customerApi } from '../../api/customer-api';

export const loadCustomersList = (): AppThunk => async dispatch => {
  const items = await customerApi.loadList();
  dispatch(setCustomersList(items));
};

export const deleteCustomer = (id: number): AppThunk => async dispatch => {
  await customerApi.deleteById(id);
  dispatch(removeCustomer(id));
};