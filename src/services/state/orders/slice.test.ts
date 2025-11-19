import { ordersSlice } from './slice';

describe('Orders slice tests', () => {
  const ordersSliceReducer = ordersSlice.reducer;

  it('test initialization', () => {
    const newState = ordersSliceReducer(undefined, { type: '' });

    expect(newState).toMatchObject({
      isOrdersLoading: false,
      orders: [],
      profileOrders: [],
      total: 0,
      totalToday: 0,
      orderByNumber: null
    });
  });
});
