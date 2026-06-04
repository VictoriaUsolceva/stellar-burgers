import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '@utils-cookie';

type TUserState = {
  isAuthChecked: boolean;
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
  registerUserError: string | null;
  registerUserRequest: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false,
  registerUserError: null,
  registerUserRequest: false
};

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(userLogout());
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi({ email, name, password });
    if (!data.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const getUser = createAsyncThunk('user/getAll', async () => {
  const data = await getUserApi();
  return data;
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ email, name, password }: TRegisterData) => {
    const data = await updateUserApi({ email, name, password });
    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
    }
  },
  selectors: {
    loginUserErrorSelector: (state) => state.loginUserError,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    userDataSelector: (state) => state.data,
    userNameSelector: (state) => state.data?.name,
    registerUserErrorSelector: (state) => state.registerUserError,
    registerUserRequestSelector: (state) => state.registerUserRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message ?? null;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.registerUserRequest = true;
        state.registerUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserRequest = false;
        state.registerUserError = action.error.message ?? null;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.registerUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      });
  }
});

export const {
  loginUserErrorSelector,
  isAuthCheckedSelector,
  userDataSelector,
  registerUserErrorSelector,
  registerUserRequestSelector,
  userNameSelector
} = userSlice.selectors;
export const { authChecked, userLogout } = userSlice.actions;
