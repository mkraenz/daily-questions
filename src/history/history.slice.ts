import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { last } from "lodash";
import moment, { Moment } from "moment";
import { mockedHistoricData } from "./mock-data";

const toDateOnly = (date: Moment) => date.toISOString(true).split("T")[0];
export const getDailiesDateOnly = (
  date: string | Date,
  startOfNextDay: string | Date
) => {
  const startOfNextDayMoment = moment(startOfNextDay);
  const dateMoment = moment(date);
  if (dateMoment.isAfter(startOfNextDayMoment)) {
    return toDateOnly(dateMoment);
  } else {
    return toDateOnly(startOfNextDayMoment.add(-1, "day"));
  }
};

interface HistoricEntry {
  date: string;
  qs: { id: string; a: number | string }[]; // qs = questions, a = answer. shortening to save bytes since AsyncStorage is max 2MB
}
export type History = HistoricEntry[];

export interface HistoryState {
  history: History;
}
const initialState: HistoryState = { history: [] };

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    submitDailies(
      state,
      action: PayloadAction<{
        date: string;
        questions: { answer: number | string; id: string }[];
        startOfNextDay: string;
      }>
    ) {
      const date = getDailiesDateOnly(
        action.payload.date,
        action.payload.startOfNextDay
      );
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
  submitDailies,
  clear: clearHistory,
  mockHistory,
} = historySlice.actions;
export default historySlice.reducer;
