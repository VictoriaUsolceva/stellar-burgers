import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientState = {
  ingredients: TIngredient[];
  error: string | null;
  isIngredientsLoading: boolean;
};

const initialState: TIngredientState = {
  ingredients: [],
  error: null,
  isIngredientsLoading: false
};

export { initialState as ingredientsInitialState };

export const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
  getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    getIngredientsSellector: (state) => state,
    getIngredientById: (state, id: string) =>
      state.ingredients.find((element) => element._id === id)
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredientsSellector, getIngredientById } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
