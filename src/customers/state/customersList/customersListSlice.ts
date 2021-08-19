import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomersListItem } from '../../interfaces/customers-list-item';


export interface CustomerListState {
  list: CustomersListItem[];
  filter: string;
}
const initialState: CustomerListState = {
  list: [],
  filter: null
};

const customersListSlice = createSlice({
  name: 'customersList',
  initialState: initialState,
  reducers: {
    setCustomersList(state, action: PayloadAction<CustomersListItem[]>) { state.list = action.payload },
    removeCustomer(state, action: PayloadAction<number>) { state.list = state.list.filter(item => item.id !== action.payload) },
    setCustomersListFilter(state, { payload }: PayloadAction<string>) { state.filter = payload },
  }
});

export const {
  setCustomersList,
  removeCustomer,
  setCustomersListFilter
} = customersListSlice.actions;

export default customersListSlice.reducer;



