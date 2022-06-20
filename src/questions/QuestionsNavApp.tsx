import React, { Reducer, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { questions } from "./default-questions";
import FullTextQuestionScreen from "./FullTextQuestionScreen";
import QuestionScreen from "./QuestionScreen";
import SummaryScreen from "./SummaryScreen";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

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
