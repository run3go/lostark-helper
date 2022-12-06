import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_SERVER } from "../components/Config";

const initialState = {
  loading: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTodoClear: (state, { payload }) => {
      const { clear, index } = payload;
      state.userData.weeklyExpTodo[index].clear = !clear;
    },
  },
  extraReducers: (builder) => {
    builder
      //registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.register = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })

      //loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.loginSuccess = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })
      //auth

      .addCase(auth.pending, (state) => {
        state.loading = true;
      })
      .addCase(auth.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData = payload;
      })
      .addCase(auth.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })

      //logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })

      //addExp
      .addCase(addExp.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData.weeklyExpTodo.push(payload.data);
      })
      .addCase(addExp.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })

      //removeExp
      .addCase(removeExp.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeExp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData.weeklyExpTodo.splice(payload.index, 1);
      })
      .addCase(removeExp.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      });
  },
});

export const registerUser = createAsyncThunk(
  "user/register",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${USER_SERVER}/register`,
        dataToSubmit
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USER_SERVER}/login`, dataToSubmit);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const auth = createAsyncThunk(
  "user/auth",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${USER_SERVER}/auth`);
      return response.data;
    } catch (err) {
      return rejectWithValue("인증에 실패했습니다");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${USER_SERVER}/logout`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const addExp = createAsyncThunk(
  "users/addExp",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USER_SERVER}/addExp`, dataToSubmit);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const removeExp = createAsyncThunk(
  "users/removeExp",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${USER_SERVER}/removeExp`,
        dataToSubmit
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const { setTodoClear } = userSlice.actions;

export default userSlice.reducer;
