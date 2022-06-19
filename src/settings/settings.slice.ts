import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  devMode: boolean;
}
const initialState: SettingsState = { devMode: false };

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDevMode(state, action: PayloadAction<boolean>) {
      state.devMode = action.payload;
    },
  },
});

export const { setDevMode } = settingsSlice.actions;
export default settingsSlice.reducer;
