import { expect, test, describe } from '@jest/globals';
import burgerConstructorSliceReducer, {
  addIngredients,
  burgerConstructorInitialState,
  setBun,
  moveUpIngrideent,
  moveDownIngrideent,
  removeIngrideent,
  clearBurgerConstructor,
  getBurgerIngredientsSelector
} from '../burgerConstructorSlice';

const mockBurgerConstructor = {
  bun: {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  },
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      id: '26811b94-cbfe-4d2b-b73f-0c4697e04b06'
    }
  ]
};
const ingredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  id: '2aaee9a8-0a6a-49c0-9dc5-51f09975d098'
};
const withIngredientState = {
  bun: {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  },
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      id: '26811b94-cbfe-4d2b-b73f-0c4697e04b06'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      id: '2aaee9a8-0a6a-49c0-9dc5-51f09975d098'
    }
  ]
};
const withoutBunState = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      id: '26811b94-cbfe-4d2b-b73f-0c4697e04b06'
    }
  ]
};
const bun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};
const withBunState = {
  bun: {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      id: '26811b94-cbfe-4d2b-b73f-0c4697e04b06'
    }
  ]
};
const ingredientMoveState = {
  bun: {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  },
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      id: '2aaee9a8-0a6a-49c0-9dc5-51f09975d098'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      id: '26811b94-cbfe-4d2b-b73f-0c4697e04b06'
    }
  ]
};
const clearState = {
  bun: null,
  ingredients: []
};

describe('[burgerConstructorSlice] тесты', () => {
  test('вызов с неизвестым экшеном', () => {
    const initialState = undefined;
    const unknownAction = {
      type: 'unknown'
    };
    const newState = burgerConstructorSliceReducer(initialState, unknownAction);

    expect(newState).toEqual({
      bun: null,
      ingredients: []
    });
  });

  describe('тесты синхронных экшенов', () => {
    test('добавить ингредиент', () => {
      const initialBurgerConstructorState = {
        ...burgerConstructorInitialState,
        ...mockBurgerConstructor
      };
      const newState = burgerConstructorSliceReducer(
        initialBurgerConstructorState,
        addIngredients(ingredient)
      );

      expect(newState).toEqual(withIngredientState);
    });

    describe('тестирование функции добаление булки', () => {
      test('добавить булку', () => {
        const initialBurgerConstructorState = {
          ...burgerConstructorInitialState,
          ...withoutBunState
        };
        const newState = burgerConstructorSliceReducer(
          initialBurgerConstructorState,
          setBun(bun)
        );

        expect(newState).toEqual(withBunState);
      });

      test('заменить булку', () => {
        const initialBurgerConstructorState = {
          ...burgerConstructorInitialState,
          ...mockBurgerConstructor
        };
        const newState = burgerConstructorSliceReducer(
          initialBurgerConstructorState,
          setBun(bun)
        );

        expect(newState).toEqual(withBunState);
      });
    });

    test('подвинуть вверх ингридеент', () => {
      const initialBurgerConstructorState = {
        ...burgerConstructorInitialState,
        ...withIngredientState
      };

      const newState = burgerConstructorSliceReducer(
        initialBurgerConstructorState,
        moveUpIngrideent({ index: 1 })
      );

      expect(newState).toEqual(ingredientMoveState);
    });

    test('подвинуть вниз ингридеент', () => {
      const initialBurgerConstructorState = {
        ...burgerConstructorInitialState,
        ...ingredientMoveState
      };

      const newState = burgerConstructorSliceReducer(
        initialBurgerConstructorState,
        moveDownIngrideent({ index: 0 })
      );

      expect(newState).toEqual(withIngredientState);
    });

    test('удалить ингридеент', () => {
      const initialBurgerConstructorState = {
        ...burgerConstructorInitialState,
        ...withIngredientState
      };

      const newState = burgerConstructorSliceReducer(
        initialBurgerConstructorState,
        removeIngrideent({ index: 1 })
      );

      expect(newState).toEqual(mockBurgerConstructor);
    });

    test('очистить', () => {
      const initialBurgerConstructorState = {
        ...burgerConstructorInitialState,
        ...mockBurgerConstructor
      };

      const newState = burgerConstructorSliceReducer(
        initialBurgerConstructorState,
        clearBurgerConstructor()
      );

      expect(newState).toEqual(clearState);
    });
  });

  describe('тесты селекторов', () => {
    test('получение всего состояния', () => {
      const state = {
        burgerConstructor: {
          ...burgerConstructorInitialState,
          ...mockBurgerConstructor
        }
      };

      const newState = getBurgerIngredientsSelector(state);

      expect(newState).toEqual(mockBurgerConstructor);
    });
  });
});
