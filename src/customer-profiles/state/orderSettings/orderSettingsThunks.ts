import { AppThunk } from "../../../store/store";
import { OrderSettings } from "../../interfaces/order-settings";
import { setOrderSettings } from "./orderSettingsSlice";
import Api from '../../api/customerProfilesApi';

export const loadOrderSettings = (profileId: string): AppThunk => async dispatch => {
  const orderSettings = await Api.loadOrderSettings(profileId);
  // ToDo: remove if in case of empty string from server
  if(orderSettings) { dispatch(setOrderSettings(orderSettings)); }
};

export const updateOrderSettings = (profileId: string, orderSettings: OrderSettings): AppThunk => async () => {
  await Api.updateOrderSettings(profileId, orderSettings);
};