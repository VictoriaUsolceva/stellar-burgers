import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  orders: TOrder[];
  orderModalData: TOrder | null;
  total: number;
  totalToday: number;
  error: string | null;
  isOrderRequest: boolean;
  selectedByNumberOrder: TOrder | null;
};

const initialState: TOrderState = {
  orders: [],
  orderModalData: null,
  total: 0,
  totalToday: 0,
  error: null,
  isOrderRequest: false,
  selectedByNumberOrder: null
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

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  selectors: {
    ordersSelector: (state) => state.orders,
    isOrderRequestSelector: (state) => state.isOrderRequest,
    getOrdersSellector: (state) => state,
    selectedByNumberOrderSellector: (state) => state.selectedByNumberOrder,
    orderModalDataSellector: (state) => state.orderModalData
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
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.selectedByNumberOrder = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.selectedByNumberOrder = action.payload.orders[0];
      });
  }
});

export const {
  getOrdersSellector,
  ordersSelector,
  isOrderRequestSelector,
  orderModalDataSellector,
  selectedByNumberOrderSellector
} = ordersSlice.selectors;
export const { clearOrderModalData } = ordersSlice.actions;
