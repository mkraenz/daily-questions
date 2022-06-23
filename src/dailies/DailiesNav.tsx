import React, { FC, Reducer, useEffect, useReducer, useState } from "react";
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
  todaysDailiesStarted: false,
};

type Action = AnswerAction | NavAction | ForceResetAction;
type AnswerAction = {
  index: number;
  answer: number | string;
  type: "answer";
};
type NavAction = {
  type: "nav";
  index: number;
};
type ForceResetAction = {
  type: "force reset";
};

const reducerFactory: (
  questionCount: number
) => Reducer<typeof initialState, Action> =
  (questionCount) => (state, action) => {
    switch (action.type) {
      case "nav": {
        const finished = state.routeIndex === questionCount - 1;
        return {
          ...state,
          routeIndex: action.index,
          finished,
          todaysDailiesStarted: true,
        };
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
          todaysDailiesStarted: true,
        };
      }
      case "force reset": {
        return { ...initialState };
      }
    }
  };

const mapState = (state: RootState) => ({
  questions: state.questions.questions.filter((q) => q.active),
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const DailiesCustomNav: FC<PropsFromRedux> = ({ questions }) => {
  const [state, dispatch] = useReducer(
    reducerFactory(questions.length),
    initialState
  );

  // handling of changes to the question list while dailies have already been started with an old questions list
  // essentially: if a question was added, archived, or moved, reset everything. Otherwise, keep the state (but change the texts)
  const [cachedQuestionsIds, setCachedQuestionsIds] = useState(
    questions.map((q) => q.id)
  );
  useEffect(() => {
    const noSeriousQuestionListChanges = questions.every(
      (q, i) => q.id === cachedQuestionsIds[i]
    );
    if (noSeriousQuestionListChanges) return; // i.e. no new questions, archived questions, or moved questions. Renames of existing questions might have occured. In this case, we can keep the current dailies state for the users comfort.
    setCachedQuestionsIds(questions.map((q) => q.id));
    dispatch({ type: "force reset" });
  }, [questions]);

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
