import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/rootReducer';

const profilesSlice = createSlice({
  name: 'loader',
  initialState: {
    currentRequests: 0
  },
  reducers: {
    startLoading(state) {state.currentRequests++;},
    finishLoading(state) { state.currentRequests-- }
  },
});

export const {
  startLoading,
  finishLoading
} = profilesSlice.actions;

export const isLoadingSelector = createDraftSafeSelector(
  (state: RootState) => state.loader,
  loader => loader.currentRequests !== 0
);

export default profilesSlice.reducer;

