import { loadFeedOrders, loadProfileOrders, loadOrder } from './actions';
import { ordersSlice } from './slice';

describe('CurrentOrder actions tests', () => {
  const testOrders = [
    {
      _id: 'testId1',
      status: 'testStatus1',
      name: 'testName1',
      createdAt: 'testCreated1',
      updatedAt: 'testUpdated1',
      number: 123,
      ingredients: ['testIngr1', 'testIngr2']
    },
    {
      _id: 'testId2',
      status: 'testStatus2',
      name: 'testName2',
      createdAt: 'testCreated2',
      updatedAt: 'testUpdated2',
      number: 456,
      ingredients: ['testIngr3', 'testIngr4']
    }
  ];

  it('test loadFeedOrders fulfilled', () => {
    const total = 100;
    const totalToday = 10;
    const action = {
      type: loadFeedOrders.fulfilled.type,
      payload: {
        orders: testOrders,
        total: total,
        totalToday: totalToday
      }
    };

    const state = ordersSlice.reducer(undefined, action);
    // profile orders are not filled
    expect(state.profileOrders).toHaveLength(0);
    expect(state.orders).toHaveLength(2);
    expect(state.orders[0]).toEqual(testOrders[0]);
    expect(state.orders[1]).toEqual(testOrders[1]);
    expect(state.isOrdersLoading).toEqual(false);
    expect(state.total).toEqual(total);
    expect(state.totalToday).toEqual(totalToday);
  });

  it('test loadFeedOrders pending', () => {
    const action = {
      type: loadFeedOrders.pending.type
    };

    const state = ordersSlice.reducer(undefined, action);
    expect(state.isOrdersLoading).toEqual(true);
  });

  it('test loadFeedOrders rejected', () => {
    const action = {
      type: loadFeedOrders.rejected.type
    };

    const state = ordersSlice.reducer(undefined, action);
    expect(state.isOrdersLoading).toEqual(false);
  });

  it('test loadProfileOrders fulfilled', () => {
    const action = {
      type: loadProfileOrders.fulfilled.type,
      payload: testOrders
    };

    const state = ordersSlice.reducer(undefined, action);
    // orders are not filled
    expect(state.orders).toHaveLength(0);
    expect(state.profileOrders).toHaveLength(2);
    expect(state.profileOrders[0]).toEqual(testOrders[0]);
    expect(state.profileOrders[1]).toEqual(testOrders[1]);
    expect(state.total).toEqual(0);
    expect(state.totalToday).toEqual(0);
    expect(state.isOrdersLoading).toEqual(false);
  });

  it('test loadProfileOrders pending', () => {
    const action = {
      type: loadProfileOrders.pending.type
    };

    const state = ordersSlice.reducer(undefined, action);
    expect(state.isOrdersLoading).toEqual(true);
  });

  it('test loadProfileOrders rejected', () => {
    const action = {
      type: loadProfileOrders.rejected.type
    };

    const state = ordersSlice.reducer(undefined, action);
    expect(state.isOrdersLoading).toEqual(false);
  });

  it('test loadOrder fulfilled', () => {
    const action = {
      type: loadOrder.fulfilled.type,
      payload: {
        orders: [{ ...testOrders[0] }]
      }
    };

    const state = ordersSlice.reducer(undefined, action);
    expect(state.orderByNumber).toEqual(testOrders[0]);

    // orders and profileOrders are not affected
    expect(state.orders).toHaveLength(0);
    expect(state.profileOrders).toHaveLength(0);
    expect(state.total).toEqual(0);
    expect(state.totalToday).toEqual(0);
    expect(state.isOrdersLoading).toEqual(false);
  });

  it('test loadOrder pending', () => {
    const action = {
      type: loadOrder.pending.type
    };

    const state = ordersSlice.reducer(undefined, action);
    expect(state.isOrdersLoading).toEqual(true);
  });

  it('test loadOrder rejected', () => {
    const action = {
      type: loadOrder.rejected.type
    };

    const state = ordersSlice.reducer(undefined, action);
    expect(state.isOrdersLoading).toEqual(false);
  });
});
