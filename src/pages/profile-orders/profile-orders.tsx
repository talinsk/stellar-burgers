import {
  loadProfileOrders,
  selectIsOrdersLoading,
  selectProfileOrders
} from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
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
