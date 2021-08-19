import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PatchObject } from '../../../core/models/interfaces/patch-object';
import { PatchOptionsArray } from '../../../core/models/interfaces/patch-options-array';
import { CustomerGeneralData } from '../../interfaces/customer-general-data';
import { PricelistMarkup } from '../../interfaces/customer-pricelist-markup';

interface CustomerState {
  customerGeneralData: CustomerGeneralData;
  pricelistsMarkups: PricelistMarkup[];
  pricelistsMarkupsFilter: string;
}
const initialState: CustomerState = {
  customerGeneralData: null,
  pricelistsMarkups: [],
  pricelistsMarkupsFilter: null
};

const customerSlice = createSlice({
  name: 'customer',
  initialState: initialState,
  reducers: {
    setCustomerGeneralData(state, action: PayloadAction<CustomerGeneralData>) { state.customerGeneralData = action.payload; },
    patchCustomerGeneralData(state, { payload }: PayloadAction<PatchObject<CustomerGeneralData>>) { 
      state.customerGeneralData[`${payload.key}`] = payload.value; 
    },
    patchOptionsArray({customerGeneralData}, { payload }: PayloadAction<PatchOptionsArray>) {
      const { key, value, shouldBeInTheList } = payload;
      let list = customerGeneralData[`${key}`] as any[];
      list = shouldBeInTheList ? [...list, value] : list.filter(v => v !== value);
      customerGeneralData[`${key}`] = list;
    },
    setPricelistsMarkups(state, action: PayloadAction<PricelistMarkup[]>) { state.pricelistsMarkups = action.payload; },
    setPricelistsMarkupsFilter(state, { payload }: PayloadAction<string>) { state.pricelistsMarkupsFilter = payload }
  },
});

export const {
  setCustomerGeneralData,
  patchCustomerGeneralData,
  setPricelistsMarkups,
  patchOptionsArray,
  setPricelistsMarkupsFilter
} = customerSlice.actions;

export default customerSlice.reducer;

