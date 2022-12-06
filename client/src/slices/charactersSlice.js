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
          payload.character.forEach((el) => {
            el.regionRaid.sort((a, b) => a.id - b.id);
          });
        }
      })
      .addCase(getCharacters.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })

      //addChar
      .addCase(addChar.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.info.character.forEach((el) => {
          el.weeklyCharTodo.push(payload.data);
        });
      })
      .addCase(addChar.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })

      //removeChar
      .addCase(removeChar.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(removeChar.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })

      //updateCharClear
      .addCase(updateCharClear.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.info.character
          .find((el) => {
            return el.name === payload.name;
          })
          .weeklyCharTodo.find((el) => {
            return el.todo === payload.todo;
          }).clear = payload.clear;
      })
      .addCase(updateCharClear.rejected, (state, { payload }) => {
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

export const addChar = createAsyncThunk(
  "characters/addChar",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${CHARACTER_SERVER}/addChar`,
        dataToSubmit
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const removeChar = createAsyncThunk(
  "characters/removeChar",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${CHARACTER_SERVER}/removeChar`,
        dataToSubmit
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateCharClear = createAsyncThunk(
  "characters/updateCharClear",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${CHARACTER_SERVER}/updateCharClear`,
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
