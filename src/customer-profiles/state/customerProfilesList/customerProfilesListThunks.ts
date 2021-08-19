import { AppThunk } from "../../../store/store";
import { setProfiles, removeProfile } from "./customerProfilesListSlice";
import Api from '../../api/customerProfilesApi';
import { setCustomers } from "../customerProfile/customerProfileSlice";

export const loadCustomerProfilesList = (): AppThunk => async dispatch => {
  const profiles = await Api.loadCustomerProfileList();
  dispatch(setProfiles(profiles));
};

export const deleteCustomerProfile = (id: string): AppThunk => async dispatch => {
  const profile = await Api.deleteCustomerProfile(id);
  dispatch(removeProfile(profile));
};


export const loadCustomers = (): AppThunk => async dispatch => {
  const customers = await Api.loadCustomerList();
  dispatch(setCustomers(customers));
};