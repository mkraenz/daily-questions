import type { StackNavigationProp } from "@react-navigation/stack";

export type QuestionsStackParamList = {
  ["Customize Question"]: undefined;
  ["Add new question"]: undefined;
};

export type QuestionsNavigationProp =
  StackNavigationProp<QuestionsStackParamList>;
