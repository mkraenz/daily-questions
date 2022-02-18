import React, { Reducer, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import FullTextQuestionScreen from "./screens/FullTextQuestionScreen";
import QuestionScreen from "./screens/QuestionScreen";
import SummaryScreen from "./screens/SummaryScreen";
import { FullTheme } from "./theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

const questions: {
  title: string;
  id: string;
  questionLong: string;
  type: "points" | "fulltext";
}[] = [
  {
    title: "Goals",
    id: "a5e36d31-0017-40a0-bf14-67de509ec656",
    questionLong: "Did I do my best to set clear goals today?",
    type: "points",
  },
  {
    title: "Progress",
    id: "063c6ce1-316e-4ed8-8215-57e0e72b6d7f",
    questionLong: "Did I do my best to make progress towards my goals today?",
    type: "points",
  },
  {
    title: "Meaning",
    id: "aa73eb84-643d-4572-99e6-7f9ab1c1dd6b",
    questionLong: "Did I do my best to find meaning in what I am doing today?",
    type: "points",
  },
  {
    title: "Happiness",
    id: "e881e50e-b11c-4988-b983-7fb1dbd5209d",
    questionLong: "Did I do my best to be happy today?",
    type: "points",
  },
  {
    title: "Social",
    id: "ec57f75e-11f7-42c4-90e8-228f52ab050f",
    questionLong: "Did I do my best to build positive relationships today?",
    type: "points",
  },
  {
    title: "Responsibility",
    id: "b1667166-29f1-4401-b73c-8e12da3cdefc",
    questionLong:
      "Did I do my best to take responsibility for my actions today?",
    type: "points",
  },
  {
    title: "Improvement",
    id: "c5c844e6-ddd9-4e2a-abdb-bc6e846f6580",
    questionLong: "Did I do my best to improve my skills and life today?",
    type: "points",
  },
  {
    title: "Highlight",
    id: "b875a18e-4ba3-4797-be5f-74bdf2b4a54a",
    questionLong: "",
    type: "fulltext",
  },
  {
    title: "Better",
    id: "c706f049-0da8-4120-bd45-47f2bd036ad9",
    questionLong: "One specific thing I want to do better tomorrow.",
    type: "fulltext",
  },
];

const initialState = {
  answers: [] as (number | string)[],
  routeIndex: 0,
  finished: false,
};
type Action = { index: number; answer: number | string };
const reducer: Reducer<typeof initialState, Action> = (state, action) => {
  const copy = [...state.answers];
  copy[action.index] = action.answer;
  const finished = state.routeIndex === questions.length - 1;
  return { answers: copy, routeIndex: state.routeIndex + 1, finished };
};

const CustomNavigationApp = () => {
  const theme = useTheme() as FullTheme;
  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.finished) {
    return (
      <View style={styles.container}>
        <SummaryScreen questions={questions} answers={state.answers} />
      </View>
    );
  }

  const question = questions[state.routeIndex % questions.length];

  if (question.type === "points") {
    return (
      <View style={styles.container}>
        <QuestionScreen
          key={question.id}
          title={question.title}
          questionLong={question.questionLong}
          index={state.routeIndex}
          answers={state.answers}
          onAnswer={(answer) => dispatch({ index: state.routeIndex, answer })}
          visible={true}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FullTextQuestionScreen
        key={question.id}
        title={question.title}
        questionLong={question.questionLong}
        index={state.routeIndex}
        answers={state.answers}
        onAnswer={(answer) => dispatch({ index: state.routeIndex, answer })}
        visible={true}
      />
    </View>
  );
};

export default CustomNavigationApp;
