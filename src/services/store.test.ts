import {
  currentOrderInitialState,
  ingredientsInitialState,
  ordersInitialState,
  userInitialState
} from '@state';
import store, { rootReducer } from './store';

describe('Store tests', () => {
  it('test rootReducer initialization', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, action);

    expect(state).not.toBeNull();

    const ingredients = state.ingredients;
    expect(ingredients).toEqual(ingredientsInitialState);

    const user = state.user;
    expect(user).toEqual(userInitialState);

    const currentOrder = state.currentOrder;
    expect(currentOrder).toEqual(currentOrderInitialState);

    const orders = state.orders;
    expect(orders).toEqual(ordersInitialState);
  });
});
