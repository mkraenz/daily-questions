import { useNavigation } from "@react-navigation/native";
import Fuse from "fuse.js";
import { isEmpty } from "lodash";
import React, { FC } from "react";
import { FlatList } from "react-native";
import { Divider, List, Searchbar } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import { Question } from "../questions/questions.slice";
import { RootState } from "../store";
import EmptyHistoryList from "./EmptyHistoryList";
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
      searchableString: entry.qs.map((q) => q.a).join(" "),
    };
  });
}

const HistoryItem: FC<{ item: HistoricEntryParams }> = ({ item }) => {
  const nav = useNavigation<HistoryNavigationProp>();
  const answers = item.questions.map((question) => question.answer).join(" ");
  const { t } = useTranslation();
  const date = item.date;
  return (
    <List.Item
      title={date}
      description={answers}
      accessibilityLabel={t("history:listItemA11yLabel", {
        date,
        answers,
      })}
      accessibilityHint={t("history:listItemA11yHint", { date })}
      onPress={() => nav.navigate("HistoricEntry", item)}
    />
  );
};

const HistoryScreen: FC<PropsFromRedux> = ({ history, questions }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query: string) => setSearchQuery(query);

  const mappedHistoryNewestFirst = mapHistory(history, questions).reverse();
  if (isEmpty(mappedHistoryNewestFirst)) {
    return <EmptyHistoryList />;
  }

  const fuse = new Fuse(mappedHistoryNewestFirst, {
    keys: ["date", "searchableString"],
  });

  const searchResults = fuse.search(searchQuery);
  const mappedSearchResults = searchResults.map((result) => result.item);

  const data = isEmpty(searchQuery)
    ? mappedHistoryNewestFirst
    : mappedSearchResults;
  return (
    <>
      <Searchbar
        style={{ marginTop: 8 }}
        placeholder={t("history:search")}
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <FlatList
        data={data}
        renderItem={(item) => <HistoryItem {...item} />}
        keyExtractor={(item) => item.date}
        ItemSeparatorComponent={Divider}
      ></FlatList>
    </>
  );
};

export default connector(HistoryScreen);
