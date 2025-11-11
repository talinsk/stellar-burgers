import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import {
  selectFeeds,
  getIngredients,
  selectOrderByNumber,
  loadOrder
} from '@slices';
import { Navigate, Params, useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { orders } = useSelector(selectFeeds);
  const orderByNumber = useSelector(selectOrderByNumber);
  const { ingredients } = useSelector(getIngredients);
  const { number } = useParams<Params>();
  const dispatch = useDispatch();

  if (!number || isNaN(+number)) {
    return <Navigate to='/feed' />;
  }

  let orderData: TOrder | null = null;
  if (orderByNumber && orderByNumber.number === +number) {
    orderData = orderByNumber;
  } else {
    orderData = orders.find((o) => o.number == +number) || null;
  }

  useEffect(() => {
    if (!orderData) {
      dispatch(loadOrder(+number));
    }
  }, []);

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
