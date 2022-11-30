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
      state.userData.weeklyToDo[index].clear = !clear;
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
      //addTodo
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData.weeklyToDo.push(payload.data);
      })
      .addCase(addTodo.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })
      //removeTodo
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTodo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData.weeklyToDo.splice(payload.index, 1);
      })
      .addCase(removeTodo.rejected, (state, { payload }) => {
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

export const addTodo = createAsyncThunk(
  "users/addTodo",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USER_SERVER}/addTodo`, dataToSubmit);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "users/removeTodo",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${USER_SERVER}/removeTodo`,
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
