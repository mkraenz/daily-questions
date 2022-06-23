import React, { FC, Reducer, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import FullTextQuestionScreen from "./FullTextQuestionScreen";
import PointsQuestionScreen from "./PointsQuestionScreen";
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

const reducerFactory: (
  questionCount: number
) => Reducer<typeof initialState, Action> =
  (questionCount) => (state, action) => {
    switch (action.type) {
      case "nav": {
        const finished = state.routeIndex === questionCount - 1;
        return { ...state, routeIndex: action.index, finished };
      }
      case "answer": {
        const copy = [...state.answers];
        copy[action.index] = action.answer;
        const finished = copy.length === questionCount;
        return {
          ...state,
          answers: copy,
          routeIndex: state.routeIndex + 1,
          finished,
        };
      }
    }
  };

const mapState = (state: RootState) => ({
  questions: state.questions.questions.filter((q) => q.active),
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const DailiesCustomNav: FC<PropsFromRedux> = ({ questions }) => {
  // TODO fix dailies nav when questions change during the dailies. Reproduction: do dailies up to summary screen. add a question. go back to summary screen. Observed: Cannot navigate to new question. Expected: Can navigate to new questions
  const [state, dispatch] = useReducer(
    reducerFactory(questions.length),
    initialState
  );

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
        <PointsQuestionScreen
          key={question.id}
          title={question.title}
          questionLong={question.questionLong}
          index={state.routeIndex}
          answers={state.answers}
          onAnswer={(answer) =>
            dispatch({ index: state.routeIndex, answer, type: "answer" })
          }
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

export default connector(DailiesCustomNav);
