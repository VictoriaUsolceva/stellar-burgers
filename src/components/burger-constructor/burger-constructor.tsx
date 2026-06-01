import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearBurgerConstructor,
  clearOrderModalData,
  getBurgerIngredientsSelector,
  getOrdersSellector,
  makeOrder,
  userDataSelector
} from '@slices';
import { useDispatch, useSelector } from '@selectors';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const { isOrderRequest: orderRequest, orderModalData } =
    useSelector(getOrdersSellector);
  const dispatch = useDispatch();

  const user = useSelector(userDataSelector);

  const navigate = useNavigate();

  const constructorItems = useSelector(getBurgerIngredientsSelector);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    if (user && constructorItems.bun) {
      const ingredients = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((el) => el._id)
      ];
      dispatch(makeOrder(ingredients));
    }
  };
  const closeOrderModal = () => {
    if (!orderRequest) {
      dispatch(clearOrderModalData());
      dispatch(clearBurgerConstructor());
    }
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
