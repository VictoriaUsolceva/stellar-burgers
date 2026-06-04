import { FC, useEffect, useMemo, useRef } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import {
  getIngredientsSellector,
  getOrderByNumber,
  selectedByNumberOrderSellector
} from '@slices';
import { useDispatch, useSelector } from '@selectors';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const dataFetch = useRef(false);

  const { number } = useParams();
  const numericNumber = parseInt(number ?? '');

  useEffect(() => {
    if (dataFetch.current) return;
    dataFetch.current = true;
    dispatch(getOrderByNumber(numericNumber));
  }, [dispatch]);

  const orderData = useSelector(selectedByNumberOrderSellector);

  const { ingredients } = useSelector(getIngredientsSellector);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
