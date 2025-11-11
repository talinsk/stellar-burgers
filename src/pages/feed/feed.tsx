import {
  selectFeedOrders,
  loadFeedOrders,
  selectIsOrdersLoading
} from '@state';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectFeedOrders);
  const isOrdersLoading = useSelector(selectIsOrdersLoading);
  const dispatch = useDispatch();

  const loadAllFeed = () => {
    dispatch(loadFeedOrders());
  };

  useEffect(() => {
    loadAllFeed();
  }, []);

  if (isOrdersLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={loadAllFeed} />;
};
