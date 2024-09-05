"use client";

import { combineReducers } from "@reduxjs/toolkit";
import reducers, { SLICE_NAME } from "./hotelListSlice";
import { useSelector } from "react-redux";

import type { TypedUseSelectorHook } from "react-redux";
import { RootState } from "@/app/store";

const reducer = combineReducers({
  data: reducers,
});

export const useAppSelector: TypedUseSelectorHook<
  RootState & {
    [SLICE_NAME]: {
      data: {};
    };
  }
> = useSelector;

export * from "./hotelListSlice";
// export { useAppDispatch } from "@/app/store";
export default reducer;
