import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import StorageKeys from "../../constant/storage-keys";

// export async action to call api
export const register = createAsyncThunk(
  "users/register",
  // payload is parameter use Send to when dispatch action
  async (payload) => {
    // call Api to register
    const data = await userApi.register(payload);
    //save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

    // return user data
    return data.user;
  }
);

export const login = createAsyncThunk(
  "users/login",
  // payload is parameter use Send to when dispatch action
  async (payload) => {
    // call Api to register
    const data = await userApi.login(payload);
    //save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

    // return user data
    return data.user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    //login user infor , if user logined userinfor saved in localstrorage else userinfor = {}/
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
  },
  reducers: {
    logout(state) {
      //clear localstorage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      //state.current reset
      state.current = {};
    },
  },
  // use for async action
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      // action.payload chính là giá trị trả về từ action trên kia/
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      // action.payload chính là giá trị trả về từ action trên kia/
      state.current = action.payload;
    },
  },
});

const { actions,reducer } = userSlice;
export const {logout} = actions;
export default reducer;
