import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultQuestions } from "../questions/default-questions";

interface Question {
  title: string;
  id: string; // first 8 chars of a uuid v4
  questionLong: string;
  type: "points" | "fulltext";
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
  },
});

export const { addQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
