import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { last } from "lodash";
import { mockedHistoricData } from "./mock-data";

const toDateOnly = (date: Date) => date.toISOString().split("T")[0];

interface HistoricEntry {
  date: string;
  qs: { id: string; a: number | string }[]; // qs = questions, a = answer. shortening to save bytes since AsyncStorage is max 2MB
}
type History = HistoricEntry[];

export interface HistoryState {
  history: History;
}
const initialState: HistoryState = { history: [] };

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    upsert(
      state,
      action: PayloadAction<{
        date: string;
        questions: { answer: number | string; id: string }[];
      }>
    ) {
      const date = toDateOnly(new Date(action.payload.date));
      const newEntry: HistoricEntry = {
        date,
        qs: action.payload.questions.map((q) => ({
          id: q.id,
          a: q.answer,
        })),
      };

      const entryForDateAlreadyExists = last(state.history)?.date === date;
      if (entryForDateAlreadyExists) {
        state.history[state.history.length - 1] = newEntry;
      } else {
        state.history.push(newEntry);
      }
    },
    clear(state) {
      console.log("clearing history");
      state.history = [];
    },
    mockHistory(state) {
      console.log("mocking history");
      state.history = mockedHistoricData;
    },
  },
});

export const {
  upsert,
  clear: clearHistory,
  mockHistory,
} = historySlice.actions;
export default historySlice.reducer;
