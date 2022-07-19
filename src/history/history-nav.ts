import type { StackNavigationProp } from "@react-navigation/stack";

export interface HistoricEntryParams {
  date: string;
  questions: {
    id: string;
    answer: string | number;
    title: string | undefined;
    questionLong: string | undefined;
    type: "points" | "fulltext" | undefined;
  }[];
}

export type HistoryStackParamList = {
  ["History"]: undefined;
  ["HistoricEntry"]: HistoricEntryParams;
};

export type HistoryNavigationProp = StackNavigationProp<HistoryStackParamList>;
