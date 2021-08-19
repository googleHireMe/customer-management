import { AppThunk } from "../../../store/store";
import { profileApi } from "../../api/profile-api";
import { removeProfile, setProfilesList } from "./profilesListSlice";

export const loadProfilesList = (): AppThunk => async dispatch => {
  const items = await profileApi.loadList();
  dispatch(setProfilesList(items));
};

export const deleteProfile = (id: string): AppThunk => async dispatch => {
  await profileApi.deleteById(id);
  dispatch(removeProfile(id));
};