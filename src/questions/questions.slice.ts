import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { partition } from "lodash";
import { defaultQuestions } from "./default-questions";

export interface Question {
  title: string;
  id: string; // first 8 chars of a uuid v4
  questionLong: string;
  type: "points" | "fulltext";
  active: boolean;
}

export interface QuestionsState {
  questions: Question[];
}
const initialState: QuestionsState = { questions: defaultQuestions };

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion(state, action: PayloadAction<Question>) {
      const [activeQuestions, inactiveQuestions] = partition(
        state.questions,
        (q) => q.active
      );
      state.questions = [
        ...activeQuestions,
        action.payload,
        ...inactiveQuestions,
      ];
    },
    editQuestion(state, action: PayloadAction<Question>) {
      const index = state.questions.findIndex(
        (q) => q.id === action.payload.id
      );
      state.questions[index] = action.payload;
    },
    archiveQuestion(state, action: PayloadAction<{ id: string }>) {
      const index = state.questions.findIndex(
        (q) => q.id === action.payload.id
      )!;
      const question = state.questions[index];
      question.active = false;
      // moveQuestion() assumes: archived questions get moved to the end of the questions list
      state.questions.splice(index, 1);
      state.questions.push(question);
    },
    moveQuestion(state, action: PayloadAction<{ to: number; id: string }>) {
      // assuming archival moves archived questions to the end of the questions list
      const { to, id } = action.payload;
      const movedQuestionIndex = state.questions.findIndex((q) => q.id === id);
      const movedQuestion = state.questions[movedQuestionIndex];

      const questionsWithoutMovedQuestion = state.questions.filter(
        (q) => q.id !== id
      );
      const questionsBeforeTo = questionsWithoutMovedQuestion.slice(0, to);
      const questionsAfterTo = questionsWithoutMovedQuestion.slice(to);
      const questions = [
        ...questionsBeforeTo,
        movedQuestion,
        ...questionsAfterTo,
      ];
      state.questions = questions;
    },
  },
});

export const { addQuestion, editQuestion, archiveQuestion, moveQuestion } =
  questionsSlice.actions;
export default questionsSlice.reducer;
