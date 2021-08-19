import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import customerProfilesList from '../customer-profiles/state/customerProfilesList/customerProfilesListSlice';
import customerProfileReducer from '../customer-profiles/state/customerProfile/customerProfileSlice';
import loaderReducer from '../UI/BackdropLoader/loaderSlice';
import parsingSettingsSliceReducer from '../customer-profiles/state/parsingSettings/parsingSettingsSlice';
import answerSettingsReducer from '../customer-profiles/state/answerSettings/answerSettingsSlice';
import pricelistsReducer from '../customer-profiles/state/pricelists/pricelistsSlice';
import orderSettingsReducer from '../customer-profiles/state/orderSettings/orderSettingsSlice';
import customersList from '../customers/state/customersList/customersListSlice';
import customer from '../customers/state/customer/customerSlice';
import profilesList from '../profiles/state/profilesList/profilesListSlice';
import profile from '../profiles/state/profile/profileSlice';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  customersList: customersList,
  customer: customer,
  profilesList: profilesList,
  profile: profile,
  customerProfilesList: customerProfilesList,
  customerProfile: customerProfileReducer,
  orderSettings: orderSettingsReducer, 
  parsingSettings: parsingSettingsSliceReducer,
  answerSettings: answerSettingsReducer,
  pricelists: pricelistsReducer,
  loader: loaderReducer,
  router: connectRouter(history)
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;