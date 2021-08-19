import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pricelist } from '../../interfaces/pricelist';


interface PricelistsState {
  pricelists: Pricelist[];
}
const initialState: PricelistsState = {
  pricelists: []
};

const pricelistsSlice = createSlice({
  name: 'pricelists',
  initialState: initialState,
  reducers: {
    setAllPricelists(state, action: PayloadAction<Pricelist[]>) { state.pricelists = action.payload; },
    addPricelist(state, action: PayloadAction<Pricelist>) {
      if (!state.pricelists) { state.pricelists = []; }
      state.pricelists.push(action.payload);
    }
  },
});

export const {
  setAllPricelists,
  addPricelist
} = pricelistsSlice.actions;

export default pricelistsSlice.reducer;

