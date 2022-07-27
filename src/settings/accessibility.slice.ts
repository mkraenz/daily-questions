import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccessibilityState {
  screenReaderEnabled: boolean;
}

const initialState: AccessibilityState = {
  screenReaderEnabled: false,
};

const accessibilitySlice = createSlice({
  name: "accessibility",
  initialState,
  reducers: {
    setScreenReaderEnabled(state, action: PayloadAction<boolean>) {
      state.screenReaderEnabled = action.payload;
    },
  },
});

export const { setScreenReaderEnabled } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;
