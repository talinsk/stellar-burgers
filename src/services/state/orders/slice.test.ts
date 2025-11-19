import { ordersInitialState, ordersSlice } from './slice';

describe('Orders slice tests', () => {
  const ordersSliceReducer = ordersSlice.reducer;

  it('test initialization', () => {
    const newState = ordersSliceReducer(undefined, { type: '' });

    expect(newState).toEqual(ordersInitialState);
  });
});
