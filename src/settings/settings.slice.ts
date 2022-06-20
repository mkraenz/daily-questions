import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  devMode: boolean;
  darkMode: boolean;
}
const initialState: SettingsState = { devMode: false, darkMode: false };

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDevMode(state, action: PayloadAction<boolean>) {
      state.devMode = action.payload;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
  },
});

export const { setDevMode, setDarkMode } = settingsSlice.actions;
export default settingsSlice.reducer;
