import { AppThunk } from "../../../store/store";
import { profileApi } from "../../api/profile-api";
import { Profile } from "../../interfaces/profile";
import { setProfile } from "./profileSlice";
import { v4 as uuid } from 'uuid';

export const loadProfile = (id: string): AppThunk => async dispatch => {
  const item = await profileApi.loadById(id);
  item.orderSettings?.excludingRules?.forEach(item => item._id = uuid());
  item.orderSettings?.marginRules?.forEach(item => item._id = uuid());
  dispatch(setProfile(item));
};

export const createProfile = (item: Profile): AppThunk => async dispatch => {
  const createdItem = await profileApi.create(item);
  dispatch(setProfile(createdItem));
};

export const updateProfile = (item: Profile): AppThunk => async dispatch => {
  await profileApi.update(item.id, item);
  dispatch(setProfile(item));
};