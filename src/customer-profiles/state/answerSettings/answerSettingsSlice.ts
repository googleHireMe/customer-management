import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnswerSettings } from '../../interfaces/answer-settings';

interface AnswerSettingsState extends AnswerSettings { };

const initialState: AnswerSettingsState = { 
  emailForAnswer:null,
  customerName:  null,
  preserveSubject: false
 };

const answerSettingsSlice = createSlice({
  name: 'answerSettings',
  initialState: initialState,
  reducers: {
    setAnswerSettings(state, action: PayloadAction<AnswerSettings>) { return action.payload; },
  },
});

export const {
  setAnswerSettings,
} = answerSettingsSlice.actions;

export default answerSettingsSlice.reducer;

