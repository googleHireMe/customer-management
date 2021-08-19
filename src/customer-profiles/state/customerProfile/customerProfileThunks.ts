import { AppThunk } from "../../../store/store";
import { CustomerProfile } from "../../interfaces/customer-profile";
import { setProfile } from "./customerProfileSlice";
import Api from '../../api/customerProfilesApi';

export const loadCustomerProfile = (id: string): AppThunk => async dispatch => {
  const profile = await Api.loadCustomerProfile(id);
  dispatch(setProfile(profile));
};

export const createCustomerProfile = (profile: CustomerProfile): AppThunk => async dispatch => {
  await Api.createCustomerProfile(profile);
};

export const updateCustomerProfile = (profile: CustomerProfile): AppThunk => async dispatch => {
  await Api.updateCustomerProfile(profile);
};