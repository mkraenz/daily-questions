import React, { Reducer, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import FullTextQuestionScreen from "./screens/FullTextQuestionScreen";
import QuestionScreen from "./screens/QuestionScreen";
import SummaryScreen from "./screens/SummaryScreen";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

// TODO
export const questions: {
  title: string;
  id: string; // first 8 chars of a uuid v4
  questionLong: string;
  type: "points" | "fulltext";
}[] = [
  {
    title: "Goals",
    id: "a5e36d31",
    questionLong: "Did I do my best to set clear goals today?",
    type: "points",
  },
  {
    title: "Progress",
    id: "063c6ce1",
    questionLong: "Did I do my best to make progress towards my goals today?",
    type: "points",
  },
  {
    title: "Meaning",
    id: "aa73eb84",
    questionLong: "Did I do my best to find meaning in what I am doing today?",
    type: "points",
  },
  {
    title: "Happiness",
    id: "e881e50e",
    questionLong: "Did I do my best to be happy today?",
    type: "points",
  },
  {
    title: "Social",
    id: "ec57f75e",
    questionLong: "Did I do my best to build positive relationships today?",
    type: "points",
  },
  {
    title: "Responsibility",
    id: "b1667166",
    questionLong:
      "Did I do my best to take responsibility for my actions today?",
    type: "points",
  },
  {
    title: "Improvement",
    id: "c5c844e6",
    questionLong: "Did I do my best to improve my skills and life today?",
    type: "points",
  },
  {
    title: "Highlight",
    id: "b875a18e",
    questionLong: "",
    type: "fulltext",
  },
  {
    title: "Better",
    id: "c706f049",
    questionLong: "One specific thing I want to do better tomorrow.",
    type: "fulltext",
  },
];

const initialState = {
  answers: [] as (number | string)[],
  routeIndex: 0,
  finished: false,
};

type Action = AnswerAction | NavAction;
type AnswerAction = {
  index: number;
  answer: number | string;
  type: "answer";
};
type NavAction = {
  type: "nav";
  index: number;
};

const reducer: Reducer<typeof initialState, Action> = (state, action) => {
  switch (action.type) {
    case "nav": {
      const finished = state.routeIndex === questions.length - 1;
      return { ...state, routeIndex: action.index, finished };
    }
    case "answer": {
      const copy = [...state.answers];
      copy[action.index] = action.answer;
      const finished = copy.length === questions.length;
      return {
        ...state,
        answers: copy,
        routeIndex: state.routeIndex + 1,
        finished,
      };
    }
  }
};

const CustomNavigationApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.finished) {
    return (
      <View style={styles.container}>
        <SummaryScreen
          questions={questions}
          answers={state.answers}
          nav={(index) => dispatch({ type: "nav", index })}
        />
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
          onAnswer={(answer) =>
            dispatch({ index: state.routeIndex, answer, type: "answer" })
          }
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
        onAnswer={(answer) =>
          dispatch({ index: state.routeIndex, answer, type: "answer" })
        }
        visible={true}
      />
    </View>
  );
};

export default CustomNavigationApp;
