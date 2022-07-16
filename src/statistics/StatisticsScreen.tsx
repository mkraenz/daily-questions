import React, { FC, useEffect, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Button, Paragraph, useTheme } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { clearHistory, mockHistory } from "../history/history.slice";
import { useTranslation } from "../localization/useTranslations";
import { Question } from "../questions/questions.slice";
import { RootState } from "../store";
import Chart from "./Chart";
import ChartSelection from "./ChartSelection";
import TimeSpanSelector, { TimeSpan } from "./TimeSpanSelector";
import WarningBanner from "./WarningBanner";

export const chartColors = [
  "red",
  "blue",
  "yellow",
  "green",
  "orange",
  "aqua",
  "purple",
  "brown",
  "navy",
  "lime",
  "fuchsia",
  "teal",
  "silver",
  "maroon",
  "darkgoldenrod", // Remember, Rod loves you.
];

const mapState = (state: RootState) => ({
  history: state.history.history,
  devMode: state.settings.devMode,
  questions: selectQuestions(state),
});
const mapDispatch = { clearHistory, mockHistory };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const getAllQuestionsSelected = (questions: Question[]) => {
  return questions
    .filter((q) => q.type === "points" && q.active)
    .map((q, i) => ({
      id: q.id,
      title: q.title,
      checked: true,
      color: chartColors[i % chartColors.length],
    }));
};

const getNDaysAgo = (days: number, datetime = new Date()) => {
  datetime.setHours(0, 0, 0, 0); // Start of Day
  datetime.setDate(new Date().getDate() - days);
  return datetime;
};

/** @param dateOnly example 2022-06-21 */
const isWithin = (timeSpan: TimeSpan, dateOnly: string): boolean => {
  const date = new Date(`${dateOnly}T00:00:00.000Z`);
  switch (timeSpan) {
    case "last7days":
      return date >= getNDaysAgo(7);
    case "last30days":
      return date >= getNDaysAgo(30);
    case "last1year":
      return date >= getNDaysAgo(365);
    case "lifetime":
    default:
      return true;
  }
};

import { StyleSheet } from "react-native";
import { selectQuestions } from "../questions/questions.selectors";
const styles = StyleSheet.create({
  insufficientDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
  },
  container: {
    marginVertical: 32,
  },
  innerContainer: { paddingHorizontal: 12 },
});

const StatisticsScreen: FC<PropsFromRedux> = ({
  history,
  devMode,
  clearHistory,
  mockHistory,
  questions,
}) => {
  const [selectedQuestions, setSelectedQuestions] = useState(
    getAllQuestionsSelected(questions)
  );
  // reload selectedQuestions every time questions change, e.g. from adding a new question
  useEffect(() => {
    setSelectedQuestions(getAllQuestionsSelected(questions));
  }, [questions]);
  const [timeSpan, setTimeSpan] = useState<TimeSpan>("last7days");
  const { t } = useTranslation();
  const theme = useTheme();

  const selectAllQuestions = () =>
    setSelectedQuestions(getAllQuestionsSelected(questions));

  const historyInTimeSpan = history.filter((entry) =>
    isWithin(timeSpan, entry.date)
  );
  if (historyInTimeSpan.length === 0 || historyInTimeSpan.length === 1) {
    return (
      <View style={styles.insufficientDataContainer}>
        <TimeSpanSelector timeSpan={timeSpan} setTimeSpan={setTimeSpan} />
        <Paragraph>
          {t("statistics:insufficientDataInTimeSpan", {
            numOfEntries: historyInTimeSpan.length,
          })}
        </Paragraph>
        {devMode && (
          <Button
            onPress={() => mockHistory()}
            mode="contained"
            style={{ backgroundColor: theme.colors.error }}
          >
            {t("statistics:mockHistory")}
          </Button>
        )}
      </View>
    );
  }

  const noQuestionsSelected =
    selectedQuestions.filter((q) => q.checked).length === 0;

  return (
    <ScrollView style={styles.container}>
      {!noQuestionsSelected ? (
        <Chart
          history={historyInTimeSpan}
          selectedQuestions={selectedQuestions}
          width={Dimensions.get("window").width}
          height={Math.floor((Dimensions.get("window").height * 2) / 3)}
        />
      ) : (
        <WarningBanner
          visible={noQuestionsSelected}
          onPress={selectAllQuestions}
        />
      )}
      <View style={styles.innerContainer}>
        <TimeSpanSelector timeSpan={timeSpan} setTimeSpan={setTimeSpan} />
        <ChartSelection
          selectedQuestions={selectedQuestions}
          setSelectedQuestions={setSelectedQuestions}
        />
        {devMode && (
          <Button
            mode="contained"
            onPress={() => clearHistory()}
            style={{ backgroundColor: theme.colors.error }}
          >
            {t("statistics:clearHistory")}
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

export default connector(StatisticsScreen);
