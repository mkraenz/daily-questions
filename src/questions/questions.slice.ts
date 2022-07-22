import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { partition } from "lodash";
import { v4 } from "uuid";

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
const initialState: QuestionsState = { questions: [] };

const getUniqueId = (questionsIds: string[]): string => {
  const id = v4().split("-")[0];
  const idAlreadyExists = questionsIds.find((qId) => qId === id);
  if (idAlreadyExists) {
    return getUniqueId(questionsIds);
  }
  return id;
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion(state, action: PayloadAction<Omit<Question, "id">>) {
      const id = getUniqueId(state.questions.map((q) => q.id));
      const [activeQuestions, inactiveQuestions] = partition(
        state.questions,
        (q) => q.active
      );
      const newQuestion = { ...action.payload, id };
      state.questions = [...activeQuestions, newQuestion, ...inactiveQuestions];
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

    setQuestions(state, action: PayloadAction<{ questions: Question[] }>) {
      state.questions = action.payload.questions;
    },
  },
});

export const {
  addQuestion,
  editQuestion,
  archiveQuestion,
  moveQuestion,
  setQuestions,
} = questionsSlice.actions;
export default questionsSlice.reducer;
