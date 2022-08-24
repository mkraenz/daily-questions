import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UnpersistedHistoryState {
  searchQuery: string;
}
const initialState: UnpersistedHistoryState = { searchQuery: "" };

const unpersistedHistorySlice = createSlice({
  name: "unpersistedHistory",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<{ searchQuery: string }>) {
      state.searchQuery = action.payload.searchQuery;
    },
  },
});

export const { setSearchQuery } = unpersistedHistorySlice.actions;
export default unpersistedHistorySlice.reducer;
