import { combineReducers, CombinedState, AnyAction, Reducer } from 'redux';
import locale, { LocaleState } from './slices/locale/localeSlice';


export type RootState = CombinedState<{
  locale: LocaleState;
}>;

export interface AsyncReducers {
  [key: string]: Reducer<any, AnyAction>;
}

const staticReducers = {
  locale,
};

const rootReducer = (asyncReducers?: AsyncReducers) => (state: RootState, action: AnyAction) => {
  const combinedReducer = combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
  return combinedReducer(state, action);
};

export default rootReducer;
