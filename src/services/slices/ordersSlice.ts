import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';

type TOrdersState = {
  orders: Array<TOrder>;
  profileOrders: Array<TOrder>;
  total: number;
  totalToday: number;
  isOrdersLoading: boolean;
  orderByNumber: TOrder | null;
};

const initialState: TOrdersState = {
  orders: [],
  profileOrders: [],
  total: 0,
  totalToday: 0,
  isOrdersLoading: false,
  orderByNumber: null
};

export const loadFeedOrders = createAsyncThunk(
  'orders/get',
  async () => await getFeedsApi()
);

export const loadProfileOrders = createAsyncThunk(
  'orders/profile/get',
  async () => await getOrdersApi()
);

export const loadOrder = createAsyncThunk(
  'order/getByNumber',
  async (orderId: number) => await getOrderByNumberApi(orderId)
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  selectors: {
    selectFeeds: (state) => state,
    selectOrderByNumber: (state) => state.orderByNumber,
    selectProfileOrders: (state) => state.profileOrders,
    selectIsOrdersLoading: (state) => state.isOrdersLoading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFeedOrders.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(loadFeedOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
      })
      .addCase(loadFeedOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(loadProfileOrders.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(loadProfileOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
      })
      .addCase(loadProfileOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.profileOrders = action.payload;
      })
      .addCase(loadOrder.pending, (state) => {
        state.orderByNumber = null;
      })
      .addCase(loadOrder.rejected, (state, action) => {})
      .addCase(loadOrder.fulfilled, (state, action) => {
        if (action.payload.orders && action.payload.orders.length > 0) {
          state.orderByNumber = action.payload.orders[0];
        }
      });
  }
});

export const {
  selectFeeds,
  selectOrderByNumber,
  selectProfileOrders,
  selectIsOrdersLoading
} = ordersSlice.selectors;
