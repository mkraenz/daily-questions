import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pick } from "lodash";

export interface SettingsState {
  devMode: boolean;
  darkMode: boolean;
  /**
   * doing dailies at the next day before this hour creates an entry for the previous day. range: 0 - 23
   * @example
   * Doing and confirming dailies at 2022-06-21T03:00 will create a historic entry for 2022-06-20 if this variable is 3 or higher.
   */
  belatedDailiesUntilNextDayAt: { hour: number; minute: number };
  appbarShownInDailies: boolean;
}

const initialState: SettingsState = {
  devMode: false,
  darkMode: false,
  belatedDailiesUntilNextDayAt: {
    hour: 12,
    minute: 0,
  },
  appbarShownInDailies: true,
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

    showAppbarInDailies(state, action: PayloadAction<boolean>) {
      state.appbarShownInDailies = action.payload;
    },
  },
});

export const {
  setDevMode,
  setDarkMode,
  setBelatedDailiesUntilNextDayAtHour,
  showAppbarInDailies,
} = settingsSlice.actions;
export default settingsSlice.reducer;
