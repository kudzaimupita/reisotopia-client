import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHotels } from "@/app/services/tasks.service";

export const SLICE_NAME = "hotelsList";

export const fetchHotels = createAsyncThunk(
  SLICE_NAME + "/getHotels",
  async () => {
    const response: any = await getHotels();
    return response.data;
  }
);

const initialState = {
  loading: false,
  list: [],
  tableData: {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: "",
    sort: {
      order: "",
      key: "",
    },
  },
};

const hotelsListSlice = createSlice({
  name: `${SLICE_NAME}/state`,
  initialState,
  reducers: {
    setHotelsList: (state, action) => {
      state.list = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.list = action.payload.result;
        state.loading = false;
      })
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { setHotelsList, setTableData } = hotelsListSlice.actions;

export default hotelsListSlice.reducer;
