import { AppThunk } from "../../../store/store";
import Api from '../../api/customerProfilesApi';
import { setAnswerSettings } from "./answerSettingsSlice";
import { AnswerSettings } from "../../interfaces/answer-settings";

export const loadAnswerSettings = (profileId: string): AppThunk => async dispatch => {
  const answerSettings = await Api.loadAnswerSettings(profileId);
  dispatch(setAnswerSettings(answerSettings));
};

export const updateAnswerSettings = (profileId: string, answerSettings: AnswerSettings): AppThunk => async dispatch => {
  await Api.updateAnswerSettings(profileId, answerSettings);
};