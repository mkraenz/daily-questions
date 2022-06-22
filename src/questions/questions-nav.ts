import type { StackNavigationProp } from "@react-navigation/stack";
import type { Question } from "./questions.slice";

export type QuestionsStackParamList = {
  ["Customize Question"]: undefined;
  ["Add new question"]: undefined;
  ["Edit Question"]: Question;
};

export type QuestionsNavigationProp =
  StackNavigationProp<QuestionsStackParamList>;
