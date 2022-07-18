import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pick } from "lodash";

export interface NotificationSettings {
  enabled: boolean;
  minute: number;
  hour: number;
}

export interface SettingsState {
  devMode: boolean;
  /** initially null to track first app open */
  darkMode: boolean | null;
  /**
   * doing dailies at the next day before this hour creates an entry for the previous day. range: 0 - 23
   * @example
   * Doing and confirming dailies at 2022-06-21T03:00 will create a historic entry for 2022-06-20 if this variable is 3 or higher.
   */
  belatedDailiesUntilNextDayAt: { hour: number; minute: number };
  appbarShownInDailies: boolean;
  uniteConfirmAndShareButtonsInDailies: boolean;
  /** optional only first app open */
  notifications?: NotificationSettings;
}

const initialState: SettingsState = {
  devMode: false,
  darkMode: null,
  belatedDailiesUntilNextDayAt: {
    hour: 12,
    minute: 0,
  },
  appbarShownInDailies: true,
  uniteConfirmAndShareButtonsInDailies: false,
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

    setUniteConfirmAndShareButtonsInDailies(
      state,
      action: PayloadAction<boolean>
    ) {
      state.uniteConfirmAndShareButtonsInDailies = action.payload;
    },

    setNotificationTime(state, action: PayloadAction<NotificationSettings>) {
      state.notifications = action.payload;
    },
  },
});

export const {
  setDevMode,
  setDarkMode,
  setBelatedDailiesUntilNextDayAtHour,
  showAppbarInDailies,
  setUniteConfirmAndShareButtonsInDailies,
  setNotificationTime,
} = settingsSlice.actions;
export default settingsSlice.reducer;
