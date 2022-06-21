import type { StackNavigationProp } from "@react-navigation/stack";

export type CustomizeQuestionsStackParamList = {
  ["Customize Question"]: undefined;
  ["Add new question"]: undefined;
};

export type CustomizeQuestionsScreenNavigationProp =
  StackNavigationProp<CustomizeQuestionsStackParamList>;
