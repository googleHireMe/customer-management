import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfilesListItem } from '../../interfaces/profiles-list-item';

export interface ProfilesListState {
  profilesList: ProfilesListItem[];
  filter: string;
}
const initialState: ProfilesListState = {
  profilesList: [],
  filter: null
};

const profilesListSlice = createSlice({
  name: 'profilesList',
  initialState: initialState,
  reducers: {
    setProfilesList(state, {payload}: PayloadAction<ProfilesListItem[]>) { state.profilesList = payload },
    setProfilesListFilter(state, { payload }: PayloadAction<string>) { state.filter = payload },
    removeProfile(state, {payload: id}: PayloadAction<string>) { }
  }
});

export const {
  setProfilesList,
  removeProfile,
  setProfilesListFilter
} = profilesListSlice.actions;

export default profilesListSlice.reducer;

