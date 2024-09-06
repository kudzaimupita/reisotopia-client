import { combineReducers, AnyAction, Reducer } from "redux";
import locale, { LocaleState } from "./slices/locale/localeSlice";
import { HotelsListState } from "../pages/store/types";

export interface RootState {
  locale: LocaleState;
  hotelsList?: HotelsListState;
}

export interface AsyncReducers {
  [key: string]: Reducer<any, AnyAction>;
}

const staticReducers = {
  locale,
};

const rootReducer = (
  asyncReducers: AsyncReducers = {}
): Reducer<RootState, AnyAction> => {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
};

export default rootReducer;
