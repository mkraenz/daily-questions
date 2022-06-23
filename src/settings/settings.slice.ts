import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pick } from "lodash";

export interface SettingsState {
  devMode: boolean;
  darkMode: boolean;
  /**
   * doing dailies at the next day before this hour creates an entry for the previous day. range: 0 - 23
   * @example
   * Doing and confirming dailies at 2022-06-21T03:00 will create a historic entry for 2022-06-20 if this variable is 3 or higher.
   * Typed optionally because of legacy production data that gets loaded by redux-persist. TODO Remove once all production data is migrated.
   */
  belatedDailiesUntilNextDayAt: { hour: number; minute: number };
}
const initialState: SettingsState = {
  devMode: false,
  darkMode: false,
  belatedDailiesUntilNextDayAt: {
    hour: 12,
    minute: 0,
  },
};

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
    setBelatedDailiesUntilNextDayAtHour(
      state,
      action: PayloadAction<{ hour: number; minute: number }>
    ) {
      state.belatedDailiesUntilNextDayAt = pick(action.payload, [
        "hour",
        "minute",
      ]);
    },
  },
});

export const { setDevMode, setDarkMode, setBelatedDailiesUntilNextDayAtHour } =
  settingsSlice.actions;
export default settingsSlice.reducer;
