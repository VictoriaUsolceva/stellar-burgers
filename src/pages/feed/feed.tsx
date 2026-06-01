import { useDispatch, useSelector } from '@selectors';
import { getFeeds, getFeedsSelector } from '@slices';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useRef } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const dataFetch = useRef(false);

  useEffect(() => {
    if (dataFetch.current) return;
    dataFetch.current = true;
    dispatch(getFeeds());
  }, [dispatch]);

  const { orders, error, isFeedsLoading } = useSelector(getFeedsSelector);

  return isFeedsLoading ? (
    <Preloader />
  ) : error ? (
    <div className={`text text_type_main-medium pt-4`}>{error}</div>
  ) : orders.length > 0 ? (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  ) : (
    <div className={`text text_type_main-medium pt-4`}>Нет заказов</div>
  );
};
