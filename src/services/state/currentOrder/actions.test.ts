import { currentOrderSlice } from './slice';
import { sendCurrentOrder } from './actions';

describe('CurrentOrder actions tests', () => {
  it('test new order fulfilled', () => {
    const newOrderResult = {
      success: true,
      order: {
        _id: 'testId',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 123,
        ingredients: []
      },
      name: ''
    };

    const action = {
      type: sendCurrentOrder.fulfilled.type,
      payload: { order: newOrderResult.order }
    };

    const state = currentOrderSlice.reducer(undefined, action);
    expect(state.newOrder).toMatchObject({
      _id: newOrderResult.order._id,
      number: newOrderResult.order.number
    });
    expect(state.orderRequest).toEqual(false);
  });

  it('test new order pending', () => {
    const action = {
      type: sendCurrentOrder.pending.type
    };

    const state = currentOrderSlice.reducer(undefined, action);
    expect(state.orderRequest).toEqual(true);
  });

  it('test new order rejected', () => {
    const action = {
      type: sendCurrentOrder.rejected.type,
      error: { message: 'TestMessage' }
    };

    const state = currentOrderSlice.reducer(undefined, action);
    expect(state.orderRequest).toEqual(false);
  });
});
