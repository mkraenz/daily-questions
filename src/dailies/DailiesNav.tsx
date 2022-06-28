import { isEmpty, isInteger } from "lodash";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import {
  initAnswers,
  resetDailies,
  setAnswer,
  setCurrentQuestionId,
} from "./dailies.slice";
import FullTextQuestionScreen from "./FulltextQuestionScreen";
import LoadingScreen from "./LoadingScreen";
import PointsQuestionScreen from "./PointsQuestionScreen";
import SummaryScreen from "./SummaryScreen";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

const mapState = (state: RootState) => ({
  questions: state.questions.questions.filter((q) => q.active),
  answers: state.dailies.answers,
  currentQuestionId: state.dailies.currentQuestionId,
  finished: state.dailies.allQuestionsAnswered,
});
const mapReducer = {
  setAnswer,
  resetDailies,
  setCurrentQuestionId,
  initAnswers,
};
const connector = connect(mapState, mapReducer);
type PropsFromRedux = ConnectedProps<typeof connector>;

const getAnswerList = (answers: { answer: string | number }[]) =>
  answers
    .map((a) => a.answer)
    .filter(isInteger)
    .join(" ");

const DailiesNav: FC<PropsFromRedux> = ({
  answers,
  currentQuestionId,
  finished,
  questions,
  setAnswer,
  resetDailies,
  setCurrentQuestionId,
  initAnswers,
}) => {
  // handling of changes to the question list while dailies have already been started with an old questions list
  // essentially: if a question was added, archived, or moved, reset everything. Otherwise, keep the state (but change the texts)
  const [cachedQuestionIds, setCachedQuestionIds] = useState(
    questions.map((q) => q.id)
  );
  useEffect(() => {
    const noSeriousQuestionListChanges = questions.every(
      (q, i) => q.id === cachedQuestionIds[i]
    );
    if (noSeriousQuestionListChanges) return; // i.e. no new questions, archived questions, or moved questions. Renames of existing questions might have occured. In this case, we can keep the current dailies state for the users comfort.
    setCachedQuestionIds(questions.map((q) => q.id));
    resetDailies();
  }, [questions]);

  useEffect(() => {
    if (isEmpty(answers)) {
      initAnswers({ questions });
    }
  }, [answers, questions]);

  if (finished) return <SummaryScreen />;

  const preliminaryIndex = answers.findIndex(
    (a) => a.questionId === currentQuestionId
  );
  const answerIndex = preliminaryIndex === -1 ? 0 : preliminaryIndex;
  const answer = answers[answerIndex];

  if (!answer) {
    // needed since we initiate answers in useEffect, so on mount answers will be empty array and thus answer undefined
    return <LoadingScreen />;
  }
  const answerList = getAnswerList(answers); // TODO move this into a selector and then into each question screen component
  const question = questions.find((q) => q.id === answer.questionId);

  if (!question) {
    return <LoadingScreen />;
  }

  const handleAnswer = (_answer: string | number) => {
    setAnswer({ questionId: answer.questionId, answer: _answer });
    const nextQuestionId = answers[answerIndex + 1]?.questionId;
    if (nextQuestionId) {
      setCurrentQuestionId({ id: nextQuestionId });
    }
  };
  if (question.type === "points") {
    return (
      <View style={styles.container}>
        <PointsQuestionScreen
          key={question.id}
          title={question.title}
          questionLong={question.questionLong}
          answer={answer.answer}
          answers={answerList}
          onAnswer={handleAnswer}
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
        answer={answer.answer}
        answers={answerList}
        onAnswer={handleAnswer}
      />
    </View>
  );
};

export default connector(DailiesNav);
