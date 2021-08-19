import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '../../interfaces/customer';
import { CustomerProfileMainSettings } from '../../interfaces/main-customer-profile';

interface CustomerProfileMainSettingsState {
  profile: CustomerProfileMainSettings;
  customers: Customer[];
}
const initialState: CustomerProfileMainSettingsState = { 
  profile: null,
  customers: null
 };

const profileSlice = createSlice({
  name: 'customerProfileMainSettings',
  initialState: initialState,
  reducers: {
    setProfile(state, action: PayloadAction<CustomerProfileMainSettings>) { state.profile = action.payload; },
    setCustomers(state, action: PayloadAction<Customer[]>) { state.customers = action.payload; }
  },
});

export const {
  setProfile,
  setCustomers
} = profileSlice.actions;

export default profileSlice.reducer;

