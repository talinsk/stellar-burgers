import {
  addIngredient,
  clearCurrentOrder,
  clearNewOrder,
  currentOrderSliceReducer,
  moveDownIngredient,
  moveUpIngredient,
  removeIngredient
} from './slice';
import { testBun, testMain, testSauce } from '../../__test__/testIngredients';

describe('CurrentOrder slice tests', () => {
  it('test addIngredient: add bun', () => {
    const newState = currentOrderSliceReducer(
      undefined,
      addIngredient(testBun)
    );

    expect(newState.constructorItems.ingredients).not.toBeNull();
    expect(newState.constructorItems.ingredients).toHaveLength(0);
    expect(newState.constructorItems.bun).not.toBeNull();
    expect(newState.constructorItems.bun).toMatchObject({
      _id: testBun._id,
      name: testBun.name,
      price: testBun.price
    });
    expect(newState.constructorItems.bun?.id).toBeTruthy();
  });

  it('test addIngredient: add main', () => {
    const newState = currentOrderSliceReducer(
      undefined,
      addIngredient(testMain)
    );

    expect(newState.constructorItems.bun).toBeNull();
    expect(newState.constructorItems.ingredients).not.toBeNull();
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    const ingr = newState.constructorItems.ingredients[0];
    expect(ingr).toMatchObject({
      _id: testMain._id,
      name: testMain.name,
      price: testMain.price
    });
    expect(ingr.id).toBeTruthy();
  });

  it('test addIngredient: add sauce', () => {
    const newState = currentOrderSliceReducer(
      undefined,
      addIngredient(testSauce)
    );

    expect(newState.constructorItems.bun).toBeNull();
    expect(newState.constructorItems.ingredients).not.toBeNull();
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    const ingr = newState.constructorItems.ingredients[0];
    expect(ingr).toMatchObject({
      _id: testSauce._id,
      name: testSauce.name,
      price: testSauce.price
    });
    expect(ingr.id).toBeTruthy();
  });

  it('test removeIngredient: remove single main ingredient', () => {
    // add main
    let newState = currentOrderSliceReducer(undefined, addIngredient(testMain));

    const main = newState.constructorItems.ingredients[0];
    newState = currentOrderSliceReducer(newState, removeIngredient(main));

    // ingredient was removed
    expect(newState.constructorItems.ingredients).not.toBeNull();
    expect(newState.constructorItems.ingredients).toHaveLength(0);
  });

  it('test removeIngredient: removing the ingredient does not affect on other ingredients', () => {
    // add main, sauce and bun
    let newState = currentOrderSliceReducer(undefined, addIngredient(testMain));
    newState = currentOrderSliceReducer(newState, addIngredient(testSauce));
    newState = currentOrderSliceReducer(newState, addIngredient(testBun));

    const main = newState.constructorItems.ingredients[0];
    newState = currentOrderSliceReducer(newState, removeIngredient(main));

    // main was removed
    expect(newState.constructorItems.ingredients).not.toBeNull();
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    // sauce was not removed
    expect(newState.constructorItems.ingredients[0]).toMatchObject({
      _id: testSauce._id,
      name: testSauce.name,
      price: testSauce.price
    });
    // bun was not removed
    expect(newState.constructorItems.bun).not.toBeNull();
  });

  it('test moveUpIngredient', () => {
    // add main and sauce
    let newState = currentOrderSliceReducer(undefined, addIngredient(testMain));
    newState = currentOrderSliceReducer(newState, addIngredient(testSauce));

    const sauce = newState.constructorItems.ingredients[1];
    newState = currentOrderSliceReducer(newState, moveUpIngredient(sauce));

    expect(newState.constructorItems.ingredients).toHaveLength(2);
    // sauce is the 0 item
    expect(newState.constructorItems.ingredients[0]).toMatchObject({
      _id: testSauce._id,
      name: testSauce.name,
      price: testSauce.price
    });

    // main is the 1 item
    expect(newState.constructorItems.ingredients[1]).toMatchObject({
      _id: testMain._id,
      name: testMain.name,
      price: testMain.price
    });
  });

  it('test moveUpIngredient: first element was not moved', () => {
    // add main and sauce
    let newState = currentOrderSliceReducer(undefined, addIngredient(testMain));
    newState = currentOrderSliceReducer(newState, addIngredient(testSauce));

    const main = newState.constructorItems.ingredients[0];
    newState = currentOrderSliceReducer(newState, moveUpIngredient(main));

    expect(newState.constructorItems.ingredients).toHaveLength(2);
    // main is the 0 item (didn't moved)
    expect(newState.constructorItems.ingredients[0]).toMatchObject({
      _id: testMain._id,
      name: testMain.name,
      price: testMain.price
    });

    // sauce is the 1 item (didn't moved)
    expect(newState.constructorItems.ingredients[1]).toMatchObject({
      _id: testSauce._id,
      name: testSauce.name,
      price: testSauce.price
    });
  });

  it('test moveDownIngredient', () => {
    // add main and sauce
    let newState = currentOrderSliceReducer(undefined, addIngredient(testMain));
    newState = currentOrderSliceReducer(newState, addIngredient(testSauce));

    const main = newState.constructorItems.ingredients[0];
    newState = currentOrderSliceReducer(newState, moveDownIngredient(main));

    expect(newState.constructorItems.ingredients).toHaveLength(2);
    // sauce is the 0 item
    expect(newState.constructorItems.ingredients[0]).toMatchObject({
      _id: testSauce._id,
      name: testSauce.name,
      price: testSauce.price
    });

    // main is the 1 item
    expect(newState.constructorItems.ingredients[1]).toMatchObject({
      _id: testMain._id,
      name: testMain.name,
      price: testMain.price
    });
  });

  it('test moveUpIngredient: last element was not moved', () => {
    // add main and sauce
    let newState = currentOrderSliceReducer(undefined, addIngredient(testMain));
    newState = currentOrderSliceReducer(newState, addIngredient(testSauce));

    const sauce = newState.constructorItems.ingredients[1];
    newState = currentOrderSliceReducer(newState, moveDownIngredient(sauce));

    expect(newState.constructorItems.ingredients).toHaveLength(2);
    // main is the 0 item (didn't moved)
    expect(newState.constructorItems.ingredients[0]).toMatchObject({
      _id: testMain._id,
      name: testMain.name,
      price: testMain.price
    });

    // sauce is the 1 item (didn't moved)
    expect(newState.constructorItems.ingredients[1]).toMatchObject({
      _id: testSauce._id,
      name: testSauce.name,
      price: testSauce.price
    });
  });

  it('test clearCurrentOrder', () => {
    // add main, sauce and bun
    let newState = currentOrderSliceReducer(undefined, addIngredient(testMain));
    newState = currentOrderSliceReducer(newState, addIngredient(testSauce));
    newState = currentOrderSliceReducer(newState, addIngredient(testBun));

    // clear current order
    newState = currentOrderSliceReducer(newState, clearCurrentOrder());

    // ingredients were removed
    expect(newState.constructorItems.ingredients).not.toBeNull();
    expect(newState.constructorItems.ingredients).toHaveLength(0);
    expect(newState.constructorItems.bun).toBeNull();
    expect(newState.orderRequest).toBeFalsy();
  });

  it('test clearNewOrder', () => {
    const initialWithOrder = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      newOrder: {
        _id: 'testId',
        status: 'testStatus',
        name: 'testName',
        createdAt: 'testCreatedAt',
        updatedAt: 'testUpdatedAt',
        number: 123,
        ingredients: []
      }
    };
    let newState = currentOrderSliceReducer(initialWithOrder, clearNewOrder());

    // newOrder was cleared
    expect(newState.newOrder).toBeNull();
  });
});
