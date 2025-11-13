import {
  loadProfileOrders,
  selectIsOrdersLoading,
  selectProfileOrders
} from '@state';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectProfileOrders);
  const isLoading = useSelector(selectIsOrdersLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProfileOrders());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
