import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParsingSettings } from '../../interfaces/parsing-settings';

interface ParsingSettingsState extends ParsingSettings { };

const initialState: ParsingSettingsState = { 
  email: null,
  subject: null,
  filename: null,
  fileType: null,
  startRow: null,
  articleColumn: null,
  brandColumn: null,
  nameColumn: null,
  quantityColumn: null,
  priceColumn: null,
  answerColumn: null,
  commentColumn: null
 };

const parsingSettingsSlice = createSlice({
  name: 'parsingSettings',
  initialState: initialState,
  reducers: {
    setParsingSettings(state, action: PayloadAction<ParsingSettings>) { return action.payload; },
  },
});

export const {
  setParsingSettings,
} = parsingSettingsSlice.actions;

export default parsingSettingsSlice.reducer;

