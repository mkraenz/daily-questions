import React, { FC, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Button } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { clearHistory, mockHistory } from "../history/history.slice";
import { questions } from "../questions/default-questions";
import GraphSelection from "../statistics/GraphSelection";
import WarningBanner from "../statistics/WarningBanner";
import { RootState } from "../store";

const mapState = (state: RootState) => ({
  history: state.history.history,
  devMode: state.settings.devMode,
});
const mapDispatch = { clearHistory, mockHistory };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const StatisticsScreen: FC<PropsFromRedux> = ({
  history,
  devMode,
  clearHistory,
  mockHistory,
}) => {
  const getAllQuestionsSelected = () => {
    return questions
      .filter((q) => q.type === "points")
      .map((q) => ({ id: q.id, title: q.title, checked: true }));
  };
  const [selectedQuestions, setSelectedQuestions] = useState(
    getAllQuestionsSelected()
  );
  const selectAllQuestions = () =>
    setSelectedQuestions(getAllQuestionsSelected());

  if (history.length === 0 || history.length === 1) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>You completed your dailies {history.length} times.</Text>
        <Text>
          Your statistics show up once you've completed at least 2 dailies.
        </Text>
        {devMode && <Button onPress={() => mockHistory()}>Mock History</Button>}
      </View>
    );
  }

  const questionIdsToDisplay = selectedQuestions
    .filter((q) => q.checked)
    .map((q) => q.id);
  const noQuestionsSelected = questionIdsToDisplay.length === 0;

  return (
    <ScrollView>
      <Text>{questions[0].title}</Text>
      {questionIdsToDisplay.length > 0 ? (
        <LineChart
          data={{
            labels: history.map((h) => h.date),
            datasets: questionIdsToDisplay.map((questionId, index) => {
              const timeseries = history.map(
                (entry) =>
                  (entry.qs.find((q) => q.id === questionId)?.a as number) ?? 0
              );
              const interpolatedRedValue = Math.floor(
                (255 * index) / questionIdsToDisplay.length
              );
              const color = (opacity = 1) =>
                `rgba(${interpolatedRedValue}, 0, 0, ${opacity})`;

              return {
                data: timeseries,
                color,
              };
            }),
          }}
          width={Dimensions.get("window").width}
          height={500}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <WarningBanner
          visible={noQuestionsSelected}
          onPress={selectAllQuestions}
        />
      )}
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
