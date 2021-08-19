import { AppThunk } from "../../../store/store";
import Api from '../../api/customerProfilesApi';
import { Pricelist } from "../../interfaces/pricelist";
import { setAllPricelists } from "./pricelistsSlice";

export const loadPricelists = (profileId: string): AppThunk => async dispatch => {
  const pricelists = await Api.loadPricelists(profileId);
  dispatch(setAllPricelists(pricelists));
};

export const updatePricelists = (profileId: string, pricelists: Pricelist[]): AppThunk => async () => {
  await Api.updatePricelists(profileId, pricelists);
};