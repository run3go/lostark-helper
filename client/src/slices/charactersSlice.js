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
    //군단장 레이드 클리어
    setRaidClear: (state, { payload }) => {
      const { charIndex, raidIndex, clear } = payload;
      state.info.character[charIndex].regionRaid[raidIndex].clear = !clear;
    },
    //군단장 변경
    setRegion: (state, { payload }) => {
      const { charIndex, raidIndex, name, id } = payload;
      state.info.character[charIndex].regionRaid[raidIndex].region = name;
      state.info.character[charIndex].regionRaid[raidIndex].id = id;
      state.info.character[charIndex].regionRaid.sort((a, b) => a.id - b.id);
    },
    //주간 캐릭터 숙제 클리어
    setCharClear: (state, { payload }) => {
      const { name, todo, clear } = payload;
      state.info.character
        .find((el) => {
          return el.name === name;
        })
        .weeklyCharTodo.find((el) => {
          return el.todo === todo;
        }).clear = !clear;
    },
    //주간 캐릭터 숙제 비활성화
    setDisabled: (state, { payload }) => {
      const { name, todo, disabled } = payload;
      state.info.character
        .find((el) => {
          return el.name === name;
        })
        .weeklyCharTodo.find((el) => {
          return el.todo === todo;
        }).disabled = !disabled;
    },
    // 일일 가디언 토벌 / 카오스 던전 클리어
    setTodayClear: (state, { payload }) => {
      const { name, clear, content } = payload;
      let nextClear = 0;
      if (clear < 2) {
        nextClear = clear + 1;
      }
      state.info.character.find((el) => {
        return el.name === name;
      })[content].clear = nextClear;
    },
    //휴식 게이지 변경
    setGaugeValue: (state, { payload }) => {
      const { name, content, value } = payload;
      state.info.character.find((el) => {
        return el.name === name;
      })[content].gauge = value;
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
        state.info.character.forEach((el) => {
          el.weeklyCharTodo.splice(payload.index, 1);
        });
      })
      .addCase(removeChar.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      });
  },
});

export const getCharacters = createAsyncThunk(
  "characters/getData",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          const response = axios.post(
            `${CHARACTER_SERVER}/getCharactersInfo`,
            dataToSubmit
          );
          resolve(response);
        }, 100);
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.res.data.message);
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

export const {
  setRaidClear,
  setRegion,
  setCharClear,
  setDisabled,
  setTodayClear,
  setGaugeValue,
} = charactersSlice.actions;

export default charactersSlice.reducer;
