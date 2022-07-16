import { createSelector } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import type { RootState } from "../store";

export const selectQuestions = (state: RootState) => state.questions.questions;

export const selectActiveQuestions = createSelector(
  [selectQuestions],
  (questions) => questions.filter((q) => q.active)
);

export const selectIsEmptyActiveQuestions = createSelector(
  [selectActiveQuestions],
  (activeQuestions) => isEmpty(activeQuestions)
);
