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
    setRaidClear: (state, { payload }) => {
      const { charIndex, raidIndex, clear } = payload;
      state.info.character[charIndex].regionRaid[raidIndex].clear = !clear;
    },
    setRegion: (state, { payload }) => {
      const { charIndex, raidIndex, name, id } = payload;
      state.info.character[charIndex].regionRaid[raidIndex].region = name;
      state.info.character[charIndex].regionRaid[raidIndex].id = id;
      state.info.character[charIndex].regionRaid.sort((a, b) => a.id - b.id);
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
        if (payload.success) {
          payload.character.forEach((char) => {
            char.regionRaid.sort((a, b) => a.id - b.id);
          });
        }
      })
      .addCase(getCharacters.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
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

export const { setRaidClear, setRegion } = charactersSlice.actions;

export default charactersSlice.reducer;
