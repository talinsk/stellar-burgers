import store, { rootReducer } from './store';

describe('Store tests', () => {
  it('test rootReducer initialization', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, action);

    expect(state).not.toBeNull();

    const ingredients = state.ingredients;
    expect(ingredients).toEqual({
      ingredients: [],
      isIngredientsLoading: false
    });

    const user = state.user;
    expect(user).toEqual({
      user: null,
      isAuthChecked: false,
      isLoading: false,
      error: ''
    });

    const currentOrder = state.currentOrder;
    expect(currentOrder).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      newOrder: null
    });

    const orders = state.orders;
    expect(orders).toEqual({
      orders: [],
      profileOrders: [],
      total: 0,
      totalToday: 0,
      isOrdersLoading: false,
      orderByNumber: null
    });
  });
});
