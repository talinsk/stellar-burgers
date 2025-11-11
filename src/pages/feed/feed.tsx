import { selectFeeds, loadFeedOrders } from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders, isOrdersLoading: isFeedLoading } = useSelector(selectFeeds);
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
