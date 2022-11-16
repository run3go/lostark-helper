import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CHARACTER_SERVER } from "../components/Config";

const initialState = {
  loading: false,
};
export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setClear: (state, { payload }) => {
      const { charIndex, raidIndex, clear } = payload;
      state.info.data[charIndex].regionRaid[raidIndex].clear = !clear;
    },
    setRegion: (state, { payload }) => {
      const { charIndex, raidIndex, nextRegion } = payload;
      state.info.data[charIndex].regionRaid[raidIndex].region = nextRegion;
    },
  },
  extraReducers: (builder) => {
    builder
      //getData
      .addCase(getCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCharacters.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.info = payload;
      })
      .addCase(getCharacters.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })
      //updateClear
      .addCase(updateClear.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateClear.rejected, (state) => {
        state.loading = false;
      })
      //updateRegion
      .addCase(updateRegion.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateRegion.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const getCharacters = createAsyncThunk(
  "characters/getData",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${CHARACTER_SERVER}/getCharactersInfo`,
        dataToSubmit
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateClear = createAsyncThunk(
  "characters/updateClear",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${CHARACTER_SERVER}/updateClear`,
        dataToSubmit
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateRegion = createAsyncThunk(
  "characters/updateRegion",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${CHARACTER_SERVER}/updateRegion`,
        dataToSubmit
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const { setClear, setRegion } = charactersSlice.actions;

export default charactersSlice.reducer;
