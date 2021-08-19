import { AppThunk } from "../../../store/store";
import Api from '../../api/customerProfilesApi';
import { ParsingSettings } from "../../interfaces/parsing-settings";
import { setParsingSettings } from "./parsingSettingsSlice";

export const loadParsingSettings = (profileId: string): AppThunk => async dispatch => {
  const parsingSettings = await Api.loadParsingSettings(profileId);
  dispatch(setParsingSettings(parsingSettings));
};

export const updateParsingSettings = (profileId: string, parsingSettings: ParsingSettings): AppThunk => async () => {
  await Api.updateParsingSettings(profileId, parsingSettings);
};