import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TfeedsSliceState = {
  orders: TOrder[];
  error: string | null;
  isFeedsLoading: boolean;
  total: number;
  totalToday: number;
};

const initialState: TfeedsSliceState = {
  orders: [],
  error: null,
  isFeedsLoading: false,
  total: 0,
  totalToday: 0
};

export const getFeeds = createAsyncThunk('feeds/orders/getAll', async () =>
  getFeedsApi()
);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  selectors: {
    getFeedsSelector: (state) => state,
    getFeedsOrderById: (state, number: number) =>
      state.orders.find((element) => element.number === number)
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isFeedsLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const { getFeedsSelector, getFeedsOrderById } = feedsSlice.selectors;
