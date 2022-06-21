import React, { FC, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { clearHistory, mockHistory } from "../history/history.slice";
import { defaultQuestions } from "../questions/default-questions";
import { RootState } from "../store";
import Chart from "./Chart";
import GraphSelection from "./GraphSelection";
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
});
const mapDispatch = { clearHistory, mockHistory };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const getAllQuestionsSelected = (questions: typeof defaultQuestions) => {
  return questions
    .filter((q) => q.type === "points")
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
    case "last 7 days":
      return date >= getNDaysAgo(7);
    case "last 30 days":
      const result = date >= getNDaysAgo(30);
      console.log(result, date, getNDaysAgo(30));
      return result;
    case "last 1 year":
      return date >= getNDaysAgo(365);
    case "lifetime":
    default:
      return true;
  }
};

const StatisticsScreen: FC<PropsFromRedux> = ({
  history,
  devMode,
  clearHistory,
  mockHistory,
}) => {
  const [selectedQuestions, setSelectedQuestions] = useState(
    getAllQuestionsSelected(defaultQuestions)
  );
  const [timeSpan, setTimeSpan] = useState<TimeSpan>("last 7 days");

  const selectAllQuestions = () =>
    setSelectedQuestions(getAllQuestionsSelected(defaultQuestions));

  const historyInTimeSpan = history.filter((entry) =>
    isWithin(timeSpan, entry.date)
  );
  if (historyInTimeSpan.length === 0 || historyInTimeSpan.length === 1) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TimeSpanSelector timeSpan={timeSpan} setTimeSpan={setTimeSpan} />
        <Text>
          You completed your dailies {historyInTimeSpan.length} times within the
          selected time span.
        </Text>
        <Text>
          Your statistics show up once you've completed at least 2 dailies.
        </Text>
        {devMode && <Button onPress={() => mockHistory()}>Mock History</Button>}
      </View>
    );
  }

  const noQuestionsSelected =
    selectedQuestions.filter((q) => q.checked).length === 0;

  return (
    <ScrollView>
      {!noQuestionsSelected ? (
        <Chart
          history={historyInTimeSpan}
          selectedQuestions={selectedQuestions}
          width={Dimensions.get("window").width}
        />
      ) : (
        <WarningBanner
          visible={noQuestionsSelected}
          onPress={selectAllQuestions}
        />
      )}
      <TimeSpanSelector timeSpan={timeSpan} setTimeSpan={setTimeSpan} />
      <GraphSelection
        selectedQuestions={selectedQuestions}
        setSelectedQuestions={setSelectedQuestions}
      />
      {devMode && (
        <Button mode="outlined" onPress={() => clearHistory()}>
          Clear history
        </Button>
      )}
    </ScrollView>
  );
};

export default connector(StatisticsScreen);
