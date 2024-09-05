import { combineReducers, AnyAction, Reducer } from 'redux';
import locale, { LocaleState } from './slices/locale/localeSlice';

export interface RootState {
  locale: LocaleState;
}

export interface AsyncReducers {
  [key: string]: Reducer<any, AnyAction>;
}

const staticReducers = {
  locale,
};

const rootReducer = (asyncReducers: AsyncReducers = {}): Reducer<RootState, AnyAction> => {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
};

export default rootReducer;
