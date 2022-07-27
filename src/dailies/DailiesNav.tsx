import { isEmpty } from "lodash";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import { defaultQuestions } from "../questions/default-questions";
import {
  selectActiveQuestions,
  selectIsEmptyActiveQuestions,
} from "../questions/questions.selectors";
import { setQuestions } from "../questions/questions.slice";
import { RootState } from "../store";
import { selectAnswers } from "./dailies.selectors";
import {
  initAnswers,
  resetDailies,
  setAnswer,
  setCurrentQuestionId,
} from "./dailies.slice";
import FullTextQuestionScreen from "./FulltextQuestionScreen";
import LoadingScreen from "./LoadingScreen";
import NoQuestionsScreen from "./NoQuestionsScreen";
import PointsQuestionScreen from "./PointsQuestionScreen";
import SummaryScreen from "./SummaryScreen";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapState = (state: RootState) => ({
  questions: selectActiveQuestions(state),
  questionsEmpty: selectIsEmptyActiveQuestions(state),
  answers: selectAnswers(state),
  currentQuestionId: state.dailies.currentQuestionId,
  finished: state.dailies.allQuestionsAnswered,
});
const mapDispatch = {
  setAnswer,
  resetDailies,
  setCurrentQuestionId,
  initAnswers,
  setQuestions,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const DailiesNav: FC<PropsFromRedux> = ({
  answers,
  currentQuestionId,
  finished,
  questions,
  questionsEmpty,
  setAnswer,
  resetDailies,
  setCurrentQuestionId,
  initAnswers,
  setQuestions,
}) => {
  // handling of changes to the question list while dailies have already been started with an old questions list
  // essentially: if a question was added, archived, moved, or its type changed, then reset everything. Otherwise, keep the state (but change the texts)
  const { t } = useTranslation();
  const [cachedQuestions, setCachedQuestions] = useState(questions);
  useEffect(() => {
    const noSeriousQuestionListChanges = questions.every(
      (q, i) =>
        q.id === cachedQuestions[i]?.id && q.type === cachedQuestions[i]?.type
    );
    if (noSeriousQuestionListChanges) return; // i.e. no new questions, archived questions, or moved questions. Renames of existing questions might have occured. In this case, we can keep the current dailies state for the users comfort.
    setCachedQuestions(questions);
    resetDailies();
  }, [questions]);

  useEffect(() => {
    // app gets stuck without loading drawer menu if no questions are available
    if (questionsEmpty) {
      const localizedDefaultQuestions = defaultQuestions.map((q) => ({
        ...q,
        title: t(`defaultQuestions:${q.title}`),
        questionLong: t(`defaultQuestions:questionLong${q.title}`),
      }));

      setQuestions({ questions: localizedDefaultQuestions });
      return;
    }

    if (isEmpty(answers)) {
      initAnswers({ questions });
    }
  }, [answers, questions, questionsEmpty]);

  if (questionsEmpty) return <NoQuestionsScreen />;

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
        onAnswer={handleAnswer}
      />
    </View>
  );
};

export default connector(DailiesNav);
