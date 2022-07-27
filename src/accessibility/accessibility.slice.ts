import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccessibilityState {
  screenReaderEnabled: boolean;
  /** workaround until https://github.com/callstack/react-native-paper/pull/2893 is merged */
  dialogOpen: boolean;
}

const initialState: AccessibilityState = {
  screenReaderEnabled: false,
  dialogOpen: false, // used to hide items to screen readers that are not part of the dialog
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
  },
});

export const { setScreenReaderEnabled, toggleDialogOpen } =
  accessibilitySlice.actions;
export default accessibilitySlice.reducer;
