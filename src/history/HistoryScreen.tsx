import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { FlatList } from "react-native";
import { Divider, List } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { Question } from "../questions/questions.slice";
import { RootState } from "../store";
import { HistoricEntryParams, HistoryNavigationProp } from "./history-nav";
import { History } from "./history.slice";

const mapState = (state: RootState) => ({
  history: state.history.history,
  questions: state.questions.questions,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

function mapHistory(history: History, questions: Question[]) {
  return history.map((entry) => {
    return {
      date: entry.date,
      questions: entry.qs.map((entryQuestion) => {
        const matchingTemplate = questions.find(
          (questionTemplate) => questionTemplate.id === entryQuestion.id
        );
        return {
          id: entryQuestion.id,
          answer: entryQuestion.a,
          title: matchingTemplate?.title,
          questionLong: matchingTemplate?.questionLong,
          type: matchingTemplate?.type,
        };
      }),
    };
  });
}

const HistoryItem: FC<{ item: HistoricEntryParams }> = ({ item }) => {
  const nav = useNavigation<HistoryNavigationProp>();
  const answerNumbers = item.questions
    .filter((q) => q.type === "points")
    .map((question) => question.answer)
    .join(" ");
  return (
    <List.Item
      title={item.date}
      description={answerNumbers}
      onPress={() => nav.navigate("HistoricEntry", item)}
    />
  );
};

const HistoryScreen: FC<PropsFromRedux> = ({ history, questions }) => {
  const mappedHistory = mapHistory(history, questions);
  return (
    <FlatList
      data={mappedHistory}
      renderItem={(item) => <HistoryItem {...item} />}
      keyExtractor={(item) => item.date}
      ItemSeparatorComponent={Divider}
    ></FlatList>
  );
};

export default connector(HistoryScreen);
