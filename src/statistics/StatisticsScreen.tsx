import React, { FC, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { clearHistory, mockHistory } from "../history/history.slice";
import { questions } from "../questions/default-questions";
import { RootState } from "../store";
import Chart from "./Chart";
import GraphSelection from "./GraphSelection";
import WarningBanner from "./WarningBanner";

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
      {!noQuestionsSelected ? (
        <Chart
          history={history}
          questionIdsToDisplay={questionIdsToDisplay}
          width={Dimensions.get("window").width}
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
