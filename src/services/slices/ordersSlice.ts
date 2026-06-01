import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  orders: TOrder[];
  orderModalData: TOrder | null;
  total: number;
  totalToday: number;
  error: string | null;
  isOrderRequest: boolean;
};

const initialState: TOrderState = {
  orders: [],
  orderModalData: null,
  total: 0,
  totalToday: 0,
  error: null,
  isOrderRequest: false
};

export const getOrders = createAsyncThunk('orders/getAll', async () => {
  const data = await getOrdersApi();
  return data;
});

export const makeOrder = createAsyncThunk(
  'order/makeOrder',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return { data, ingredients };
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  selectors: {
    ordersSelector: (state) => state.orders,
    isOrderRequestSelector: (state) => state.isOrderRequest,
    getOrdersSellector: (state) => state
  },
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isOrderRequest = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isOrderRequest = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isOrderRequest = false;
        state.orders = action.payload;
      })
      .addCase(makeOrder.pending, (state) => {
        state.isOrderRequest = true;
        state.error = null;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.isOrderRequest = false;
        state.error = action.error.message ?? null;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.isOrderRequest = false;
        const order = {
          ...action.payload.data.order,
          ingredients: action.payload.ingredients
        };
        state.orders = [...state.orders, order];
        state.orderModalData = order;
      });
  }
});

export const { getOrdersSellector, ordersSelector, isOrderRequestSelector } =
  ordersSlice.selectors;
export const { clearOrderModalData } = ordersSlice.actions;
