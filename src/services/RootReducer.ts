import { combineSlices } from '@reduxjs/toolkit';
import {
  burgerConstructorSlice,
  feedsSlice,
  ingredientsSlice,
  ordersSlice,
  userSlice
} from '@slices';

export const RootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  feedsSlice,
  ordersSlice,
  userSlice
);
