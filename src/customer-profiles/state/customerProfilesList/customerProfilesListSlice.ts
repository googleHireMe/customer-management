import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/rootReducer';
import { CustomerProfileListItem } from '../../interfaces/customer-profile-list-item';


const customerProfilesListAdapter = createEntityAdapter<CustomerProfileListItem>({
  selectId: (profile) => profile.id,
  sortComparer: (currentProfile, nextProfile) => currentProfile.id > nextProfile.id ? -1 : 1,
});

const customerProfilesListSlice = createSlice({
  name: 'customerProfilesList',
  initialState: customerProfilesListAdapter.getInitialState(),
  reducers: {
    setProfiles(state, action: PayloadAction<CustomerProfileListItem[]>) { customerProfilesListAdapter.setAll(state, action.payload) },
    removeProfile(state, action: PayloadAction<CustomerProfileListItem>) { customerProfilesListAdapter.removeOne(state, action.payload.id) }
  },
});

export const customerProfilesListSelector = customerProfilesListAdapter.getSelectors<RootState>(state => state.customerProfilesList);

export const {
  setProfiles,
  removeProfile
} = customerProfilesListSlice.actions;

export default customerProfilesListSlice.reducer;

