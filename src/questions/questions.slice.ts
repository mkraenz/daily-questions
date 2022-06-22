import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      state.questions.push(action.payload);
    },
    editQuestion(state, action: PayloadAction<Question>) {
      const index = state.questions.findIndex(
        (q) => q.id === action.payload.id
      );
      state.questions[index] = action.payload;
    },
    archiveQuestion(state, action: PayloadAction<{ id: string }>) {
      const question = state.questions.find((q) => q.id === action.payload.id)!;
      question.active = false;
    },
  },
});

export const { addQuestion, editQuestion, archiveQuestion } =
  questionsSlice.actions;
export default questionsSlice.reducer;
