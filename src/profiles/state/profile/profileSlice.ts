import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PatchObject } from '../../../core/models/interfaces/patch-object';
import { PatchOptionsArray } from '../../../core/models/interfaces/patch-options-array';
import { defineInnerProp } from '../../../core/utils/define-inner-prop';
import { patchInnerObject } from '../../../core/utils/patch-inner-object';
import { AnswerSettings } from '../../interfaces/answer-settings';
import { ExcludingRule } from '../../interfaces/excluding-rule';
import { MarginRule } from '../../interfaces/margin-rule';
import { OrderSettings } from '../../interfaces/order-settings';
import { ParsingSettings } from '../../interfaces/parsing-settings';
import { Pricelist } from '../../interfaces/pricelist';
import { Profile } from '../../interfaces/profile';
import { v4 as uuid } from 'uuid';

interface ProfileState {
  profile: Profile;
  pricelistsFilter: string;
}
const initialState: ProfileState = {
  profile: null,
  pricelistsFilter: ''
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile>) { 
      state.profile = action.payload; 
    },
    patchProfile(state, { payload }: PayloadAction<PatchObject<Profile>>) { 
      state.profile[`${payload.key}`] = payload.value; 
    },
    patchProfileOrderSettings(state, { payload }: PayloadAction<PatchObject<OrderSettings>>) {
      patchInnerObject<Profile, OrderSettings>(state.profile, 'orderSettings', payload);
    },
    patchProfileParsingSettings(state, { payload }: PayloadAction<PatchObject<ParsingSettings>>) { 
      patchInnerObject<Profile, ParsingSettings>(state.profile, 'parsingSettings', payload);
    },
    patchProfileAnswerSettings(state, { payload }: PayloadAction<PatchObject<AnswerSettings>>) { 
      patchInnerObject<Profile, AnswerSettings>(state.profile, 'answerSettings', payload); 
    },
    patchProfileGeneratePriceSettings(state, { payload }: PayloadAction<PatchObject<AnswerSettings>>) { 
      patchInnerObject<Profile, AnswerSettings>(state.profile, 'generatePriceSettings', payload); 
    },
    patchProfilePricelists(state, { payload }: PayloadAction<PatchObject<Pricelist>>) {
      const { id, key, value } = payload;
      const itemToUpdate = state.profile.pricelists.find(item => item.pricelistId === id);
      itemToUpdate[`${key}`] = value;
    },
    patchProfileExcludingRule(state, { payload }: PayloadAction<PatchObject<ExcludingRule>>) {
      const { id, key, value } = payload;
      const itemToUpdate = state.profile.orderSettings.excludingRules.find(item => item.pricelistId === id);
      itemToUpdate[`${key}`] = value;
    },
    patchProfileMarginRule(state, { payload }: PayloadAction<PatchObject<MarginRule>>) {
      const { id, key, value } = payload;
      const itemToUpdate = state.profile.orderSettings.marginRules.find(item => item.pricelistId === id);
      itemToUpdate[`${key}`] = value;
    },
    createExcludingRule(state) {
      defineInnerProp(state.profile,'orderSettings', {});
      defineInnerProp(state.profile.orderSettings,'excludingRules', []);  
      const item = {_id: uuid()} as any as ExcludingRule;
      state.profile.orderSettings.excludingRules.push(item);
    },
    createMarginRule(state) {
      defineInnerProp(state.profile,'orderSettings', {});
      defineInnerProp(state.profile.orderSettings,'marginRules', []);  
      const item = {_id: uuid()} as any as MarginRule;
      state.profile.orderSettings.marginRules.push(item);
    },
    removeExcludingRule(state, { payload: _id }: PayloadAction<string>) {
      debugger;
      state.profile.orderSettings.excludingRules = state.profile.orderSettings.excludingRules.filter(item => item._id !== _id);
    },
    removeMarginRule(state,{ payload: _id }: PayloadAction<string>) {
      state.profile.orderSettings.marginRules = state.profile.orderSettings.marginRules.filter(item => item._id !== _id);
    },
    setPricelistsFilter(state, { payload }: PayloadAction<string>) {
      state.pricelistsFilter = payload;
    },
    patchOptionsArray({profile}, { payload }: PayloadAction<PatchOptionsArray>) {
      // const { key, value, shouldBeInTheList } = payload;
      // let list = profileGeneralData[`${key}`] as any[];
      // list = shouldBeInTheList ? [...list, value] : list.filter(v => v !== value);
      // profileGeneralData[`${key}`] = list;
    },
  },
});

export const {
  setProfile,
  patchProfile,
  patchOptionsArray,
  patchProfileOrderSettings,
  patchProfileParsingSettings,
  patchProfileAnswerSettings,
  patchProfileGeneratePriceSettings,
  patchProfilePricelists,
  patchProfileExcludingRule,
  patchProfileMarginRule,
  createExcludingRule,
  createMarginRule,
  removeExcludingRule,
  removeMarginRule,
  setPricelistsFilter
} = profileSlice.actions;

export default profileSlice.reducer;

