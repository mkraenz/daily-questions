import moment from "moment";
import React, { FC, useState } from "react";
import { ScrollView, Share, StyleSheet, View } from "react-native";
import {
  Button,
  Paragraph,
  Title,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { getDailiesDateOnly, submitDailies } from "../history/history.slice";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import { resetDailies, setCurrentQuestionId } from "./dailies.slice";
import ResetDailiesBar from "./ResetDailiesBar";
import SuccessMessage from "./SuccessMessage";
import SeparateConfirmAndShareButtons from "./summary/SeparateConfirmAndShareButtons";

const styles = StyleSheet.create({
  container: {
    marginVertical: 32,
    marginHorizontal: 24,
  },
  contentContainer: {
    alignItems: "center",
  },
  title: {
    marginBottom: 24,
  },
  pointsQuestionsContainer: {
    marginBottom: 24,
  },
  pointsAnswerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  answerTitle: {
    paddingRight: 16,
  },
  fulltextQuestionsContainer: {
    width: "100%",
    marginBottom: 24,
  },
  fulltextRow: { marginBottom: 12 },
  button: {
    marginBottom: 12,
    minWidth: "50%",
  },
});

interface Props {}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const mapState = (state: RootState) => ({
  startOfNextDayTime: state.settings.belatedDailiesUntilNextDayAt,
  appbarShown: state.settings.appbarShownInDailies,
  uniteConfirmAndShareButtons:
    state.settings.uniteConfirmAndShareButtonsInDailies,
  answeredQuestions: state.dailies.answers.map((answer) => {
    const question = state.questions.questions.find(
      (q) => q.id === answer.questionId
    );
    if (!question) {
      throw new Error(
        "This should never occur since answers are derived from questions."
      );
    }
    return {
      ...question,
      answer: answer.answer,
    };
  }),
});
const mapDispatch = {
  resetDailies,
  setCurrentQuestionId,
  submitDailies,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const PointsAnswer: FC<{
  title: string;
  answer: string | number;
  onClick: () => void;
}> = ({ title, answer, onClick }) => {
  const theme = useTheme();
  return (
    <TouchableRipple onPress={onClick}>
      <View style={styles.pointsAnswerRow}>
        <Paragraph style={styles.answerTitle}>{title}</Paragraph>
        <Button mode="outlined" color={theme.colors.text}>
          {answer}
        </Button>
      </View>
    </TouchableRipple>
  );
};

const FullTextAnswer: FC<{
  title: string;
  answer: string | number;
  onClick: () => void;
}> = ({ title, answer, onClick }) => {
  return (
    <TouchableRipple onPress={onClick}>
      <View style={styles.fulltextRow}>
        <Paragraph>
          {title}: {answer}
        </Paragraph>
      </View>
    </TouchableRipple>
  );
};

const ConfirmAndShareButton: FC<{
  handlePressed: () => void;
}> = ({ handlePressed }) => {
  const { t } = useTranslation();
  return (
    <Button icon="share" mode="contained" onPress={handlePressed}>
      {t("dailies:confirmAndShare")}
    </Button>
  );
};

const SummaryScreen: FC<Props & PropsFromRedux> = ({
  answeredQuestions,
  startOfNextDayTime,
  appbarShown,
  setCurrentQuestionId,
  submitDailies,
  uniteConfirmAndShareButtons,
}) => {
  const [successMessageShown, showSuccessMessage] = useState(false);
  const { t } = useTranslation();

  const startOfNextDay = new Date();
  startOfNextDay.setHours(
    startOfNextDayTime.hour,
    startOfNextDayTime.minute,
    0,
    0
  );

  const now = new Date();
  const today = getDailiesDateOnly(now, startOfNextDay);
  const formatExportMessage = () => {
    const body = answeredQuestions
      .map((q) => {
        const maybeNewLine = q.type === "fulltext" ? "\n" : "";
        return `${maybeNewLine}${q.title}: ${q.answer}`;
      })
      .join("\n");
    const weekday = days[moment(today, true).day()];
    const header = `${today} ${t(`weekdays:${weekday}`)}\n\n`;
    return `${header}${body}`;
  };
  const handleConfirmPressed = () => {
    submitDailies({
      date: now.toISOString(),
      questions: answeredQuestions.map((q, i) => ({
        id: q.id,
        answer: q.answer,
      })),
      startOfNextDay: startOfNextDay.toISOString(),
    });
    showSuccessMessage(true);
  };
  const handleSharePressed = async () => {
    await Share.share({
      message: formatExportMessage(),
    });
  };
  const handleConfirmAndSharePressed = async () => {
    handleConfirmPressed();
    await handleSharePressed();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {!appbarShown && <ResetDailiesBar />}
      <Title style={styles.title}>
        {t("dailies:summaryHeader", { today })}
      </Title>
      <View style={styles.pointsQuestionsContainer}>
        {answeredQuestions
          .filter((q) => q.type === "points")
          .map((question) => (
            <PointsAnswer
              key={question.id}
              answer={question.answer}
              title={question.title}
              onClick={() =>
                setCurrentQuestionId({
                  id: question.id,
                  resetAllQuestionsAnsweredFlag: true,
                })
              }
            />
          ))}
      </View>
      <View style={styles.fulltextQuestionsContainer}>
        {answeredQuestions
          .filter((q) => q.type === "fulltext")
          .map((question) => (
            <FullTextAnswer
              key={question.id}
              answer={question.answer}
              title={question.title}
              onClick={() =>
                setCurrentQuestionId({
                  id: question.id,
                  resetAllQuestionsAnsweredFlag: true,
                })
              }
            />
          ))}
      </View>
      {uniteConfirmAndShareButtons ? (
        <ConfirmAndShareButton handlePressed={handleConfirmAndSharePressed} />
      ) : (
        <SeparateConfirmAndShareButtons
          handleConfirmPressed={handleConfirmPressed}
          handleSharePressed={handleSharePressed}
        />
      )}
      <SuccessMessage
        visible={successMessageShown}
        onDismiss={() => showSuccessMessage(false)}
        text={t("dailies:confirmedSuccessfully")}
        dismissActionLabel={t("dailies:ok")}
      />
    </ScrollView>
  );
};

export default connector(SummaryScreen);
