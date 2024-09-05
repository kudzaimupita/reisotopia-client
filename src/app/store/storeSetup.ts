import {
  configureStore,
  Action,
  Reducer,
  AnyAction,
  Store,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer, { RootState, AsyncReducers } from "./rootReducer";

const middlewares: any[] = [];

const persistConfig = {
  key: "reisotopia-client",
  keyPrefix: "",
  storage,
  whitelist: ["locale"],
};

interface CustomStore extends Store<RootState, AnyAction> {
  asyncReducers?: AsyncReducers;
}

const store: CustomStore = configureStore({
  reducer: persistReducer(persistConfig, rootReducer() as Reducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
  devTools: process.env.NODE_ENV === "development",
});

store.asyncReducers = {};

export const persistor = persistStore(store);

export function injectReducer<S>(key: string, reducer: Reducer<S, Action>) {
  if (store.asyncReducers) {
    if (store.asyncReducers[key]) {
      return false;
    }
    store.asyncReducers[key] = reducer;
    store.replaceReducer(
      persistReducer(persistConfig, rootReducer(store.asyncReducers) as Reducer)
    );
  }
  persistor.persist();
  return store;
}

export type AppDispatch = typeof store.dispatch;

export default store;
