import { createSelector } from "@reduxjs/toolkit";
import { isInteger } from "lodash";
import type { RootState } from "../store";

export const selectAnswers = (state: RootState) => state.dailies.answers;

export const selectAnswerList = createSelector([selectAnswers], (answers) =>
  answers
    .map((a) => a.answer)
    .filter(isInteger)
    .join(" ")
);
