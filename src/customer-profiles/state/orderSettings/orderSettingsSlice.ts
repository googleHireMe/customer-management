import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExcludingRule } from '../../interfaces/excluding-rule';
import { MarginRule } from '../../interfaces/margin-rule';
import { OrderSettings } from '../../interfaces/order-settings';

interface OrderSettingsState extends OrderSettings { }
const initialState: OrderSettingsState = { 
  deliveryTerms: null,
  isExactQuantityOrdering: null,
  excludingRules: [],
  marginRules: []
 };

const profileSlice = createSlice({
  name: 'orderSettings',
  initialState: initialState,
  reducers: {
    setOrderSettings(state, action: PayloadAction<OrderSettings>) { return action.payload; },
    addExcludingRule(state, action: PayloadAction<ExcludingRule>) { 
      if (!state.excludingRules) { state.excludingRules = []; }
      state.excludingRules.push(action.payload);
    },
    addMarginRule(state, action: PayloadAction<MarginRule>) { 
      if(!state.marginRules) { state.marginRules = []; }
      state.marginRules.push(action.payload);
    }
  },
});

export const {
  setOrderSettings,
  addExcludingRule,
  addMarginRule
} = profileSlice.actions;

export default profileSlice.reducer;

