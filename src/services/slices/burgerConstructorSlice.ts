import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TBun = {
  price: number;
  _id: string;
};

type TBurgerConstructorState = {
  bun: TBun | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    getBurgerIngredientsSelector: (state) => state
  },
  reducers: {
    addIngredients: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = [...state.ingredients, action.payload];
    },
    setBun: (state, action: PayloadAction<TBun>) => {
      state.bun = action.payload;
    },
    moveUpIngrideent: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      [state.ingredients[index], state.ingredients[index - 1]] = [
        state.ingredients[index - 1],
        state.ingredients[index]
      ];
    },
    moveDownIngrideent: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      [state.ingredients[index], state.ingredients[index + 1]] = [
        state.ingredients[index + 1],
        state.ingredients[index]
      ];
    },
    removeIngrideent: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.ingredients = [
        ...state.ingredients.filter((_, indexElement) => indexElement !== index)
      ];
    },
    clearBurgerConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const { getBurgerIngredientsSelector } =
  burgerConstructorSlice.selectors;
export const {
  addIngredients,
  setBun,
  moveUpIngrideent,
  moveDownIngrideent,
  removeIngrideent,
  clearBurgerConstructor
} = burgerConstructorSlice.actions;
