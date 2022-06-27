import React, { FC } from "react";
import { ScrollView, Share, StyleSheet, View } from "react-native";
import {
  Button,
  Paragraph,
  Title,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { getDailiesDateOnly, submitDailies } from "../history/history.slice";
import { RootState } from "../store";
import ResetDailiesBar from "./ResetDailiesBar";

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
});

interface Props {
  questions: {
    title: string;
    id: string;
    questionLong: string;
    type: "points" | "fulltext";
  }[];
  answers: (number | string)[];
  nav: (index: number) => void;
  onReset: () => void;
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const mapState = (state: RootState) => ({
  startOfNextDayTime: state.settings.belatedDailiesUntilNextDayAt,
  appbarShown: state.settings.appbarShownInDailies,
});
const connector = connect(mapState);
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

const ShareButton: FC<{
  handlePressed: () => void;
}> = ({ handlePressed }) => {
  return (
    <Button icon="share" mode="contained" onPress={handlePressed}>
      Confirm and Share
    </Button>
  );
};

const SummaryScreen: FC<Props & PropsFromRedux> = ({
  questions,
  answers,
  nav,
  startOfNextDayTime,
  onReset,
  appbarShown,
}) => {
  const dispatch = useDispatch();

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
    const body = questions
      .map((q, i) => {
        const maybeNewLine = q.type === "fulltext" ? "\n" : "";
        return `${maybeNewLine}${q.title}: ${answers[i]}`;
      })
      .join("\n");
    const weekday = days[new Date().getDay()];
    const header = `${today} ${weekday}\n\n`;
    return `${header}${body}`;
  };
  const handleSharePressed = async () => {
    dispatch(
      submitDailies({
        date: now.toISOString(),
        questions: answers.map((a, i) => ({ id: questions[i].id, answer: a })),
        startOfNextDay: startOfNextDay.toISOString(),
      })
    );
    await Share.share({
      message: formatExportMessage(),
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {!appbarShown && <ResetDailiesBar onReset={onReset} />}
      <Title style={styles.title}>Your Dailies from {today}</Title>
      <View style={styles.pointsQuestionsContainer}>
        {questions
          .map((question, i) =>
            // TODO wow this is ugly. refactor this. the complexity comes from answers being dependent on indices and not ids. Also see the other answer type
            question.type === "points" ? (
              <PointsAnswer
                key={question.id}
                answer={answers[i]}
                title={question.title}
                onClick={() => nav(i)}
              />
            ) : null
          )
          .filter(Boolean)}
      </View>
      <View style={styles.fulltextQuestionsContainer}>
        {questions
          .map((question, i) =>
            question.type === "fulltext" ? (
              <FullTextAnswer
                key={question.id}
                answer={answers[i]}
                title={question.title}
                onClick={() => nav(i)}
              />
            ) : null
          )
          .filter(Boolean)}
      </View>
      <ShareButton handlePressed={handleSharePressed} />
    </ScrollView>
  );
};

export default connector(SummaryScreen);
