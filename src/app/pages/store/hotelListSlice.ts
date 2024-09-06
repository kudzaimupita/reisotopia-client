import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getHotels } from "@/app/services/tasks.service";
import {
  HotelsResponse,
  FetchHotelsParams,
  HotelsState,
  TableData,
  Hotel,
  PriceRangePayload,
} from "./types";

export const SLICE_NAME = "hotelsList";

export const fetchHotels = createAsyncThunk<HotelsResponse, FetchHotelsParams>(
  SLICE_NAME + "/getHotels",
  async (params: FetchHotelsParams) => {
    if (params.query) {
      params["search"] = params.query;
      delete params.query;
    }

    if (params.pageIndex) {
      params["pageNumber"] = params.pageIndex;
      delete params.pageIndex;
    }

    const response: any = await getHotels(params);
    return response.data;
  }
);

const initialState: HotelsState = {
  loading: false,
  list: [],
  tableData: {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: "",
    sort: "",
    minPrice: 0,
    maxPrice: 300,
  },
};

const hotelsListSlice = createSlice({
  name: `${SLICE_NAME}/state`,
  initialState,
  reducers: {
    setHotelsList: (state, action: PayloadAction<Hotel[]>) => {
      state.list = action.payload;
    },
    setTableData: (state, action: PayloadAction<TableData>) => {
      state.tableData = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.tableData.query = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.tableData.sort = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.tableData.pageIndex = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<PriceRangePayload>) => {
      const { minPrice, maxPrice } = action.payload;
      state.tableData.minPrice = minPrice;
      state.tableData.maxPrice = maxPrice;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchHotels.fulfilled,
        (state, action: PayloadAction<HotelsResponse>) => {
          state.list = action.payload.result.hotels;
          state.tableData.total = action.payload.result.totalPages;
          state.loading = false;
        }
      )
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
      });
  },
});

export const {
  setHotelsList,
  setTableData,
  setQuery,
  setPageNumber,
  setSort,
  setPriceRange,
} = hotelsListSlice.actions;

export default hotelsListSlice.reducer;
