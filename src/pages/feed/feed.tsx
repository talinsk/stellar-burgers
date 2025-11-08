import { getFeeds, loadFeedOrders } from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders, isFeedLoading } = useSelector(getFeeds);
  const dispatch = useDispatch();

  const loadAllFeed = () => {
    dispatch(loadFeedOrders());
  };

  useEffect(() => {
    if (!isFeedLoading) {
      loadAllFeed();
    }
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={loadAllFeed} />;
};
