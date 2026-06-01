import { useDispatch, useSelector } from '@selectors';
import { getOrders, isOrderRequestSelector, ordersSelector } from '@slices';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect, useRef } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const dataFetch = useRef(false);

  useEffect(() => {
    if (dataFetch.current) return;
    dataFetch.current = true;
    dispatch(getOrders());
  }, [dispatch]);

  const orders = useSelector(ordersSelector);
  const isOrderRequest = useSelector(isOrderRequestSelector);

  if (isOrderRequest) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
