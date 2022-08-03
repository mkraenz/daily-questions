import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccessibilityState {
  screenReaderEnabled: boolean;
  /** workaround until https://github.com/callstack/react-native-paper/pull/2893 is merged */
  dialogOpen: boolean;
  highContrast: boolean;
  disableAutoNavigationOnAnswer: boolean;
}

const initialState: AccessibilityState = {
  screenReaderEnabled: false,
  dialogOpen: false, // used to hide items to screen readers that are not part of the dialog
  highContrast: false,
  disableAutoNavigationOnAnswer: false,
};

const accessibilitySlice = createSlice({
  name: "accessibility",
  initialState,
  reducers: {
    setScreenReaderEnabled(state, action: PayloadAction<boolean>) {
      state.screenReaderEnabled = action.payload;
    },

    toggleDialogOpen(state) {
      state.dialogOpen = !state.dialogOpen;
    },

    toggleHighContrast(state) {
      state.highContrast = !state.highContrast;
    },

    toggleDisableAutoNavigationOnAnswer(state) {
      state.disableAutoNavigationOnAnswer =
        !state.disableAutoNavigationOnAnswer;
    },
  },
});

export const {
  setScreenReaderEnabled,
  toggleDialogOpen,
  toggleHighContrast,
  toggleDisableAutoNavigationOnAnswer,
} = accessibilitySlice.actions;
export default accessibilitySlice.reducer;
