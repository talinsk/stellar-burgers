import { FC, useMemo } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearCurrentOrder,
  clearNewOrder,
  selectCurrentOrder,
  selectNewOrder,
  selectNewOrderRequest,
  selectUser,
  sendCurrentOrder
} from '@state';
import { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectCurrentOrder);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const newOrder = useSelector(selectNewOrder);
  const orderRequest = useSelector(selectNewOrderRequest);
  const dispatch = useDispatch();

  let orderModalData: TOrder | null = newOrder || null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
    } else {
      const ids = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((i) => i._id),
        constructorItems.bun._id
      ];
      dispatch(sendCurrentOrder(ids)).then(() => {
        dispatch(clearCurrentOrder());
      });
    }
  };

  const closeOrderModal = () => {
    dispatch(clearNewOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
