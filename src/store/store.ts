
import { configureStore, Action } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import thunk, { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState, history } from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    routerMiddleware(history),
    thunk
  ]
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store