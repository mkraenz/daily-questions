import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { ScrollView, View } from "react-native";
import { Button, List } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import { QuestionsNavigationProp } from "./questions-nav";

interface Props {
  title: string;
  id: string; // first 8 chars of a uuid v4
  questionLong: string;
  type: "points" | "fulltext";
}

const ListItem: FC<Props> = ({ title, questionLong, type, id }) => {
  const icon = type === "points" ? "numeric" : "format-color-text";
  const nav = useNavigation<QuestionsNavigationProp>();
  const gotoEditQuestion = () => {
    nav.push("Edit Question", { questionLong, type, id, title });
  };
  return (
    <List.Item
      onPress={gotoEditQuestion}
      title={title}
      description={questionLong}
      left={(props) => <List.Icon {...props} icon={icon} />}
      right={(props) => <List.Icon {...props} icon="reorder-horizontal" />}
    />
  );
};

const mapState = (state: RootState) => ({
  questions: state.questions.questions,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const QuestionsListScreen: FC<PropsFromRedux> = ({ questions }) => {
  const nav = useNavigation<QuestionsNavigationProp>();
  const gotoNewQuestion = () => nav.push("Add new question");

  return (
    <ScrollView>
      <View style={{ paddingVertical: 20 }}>
        <Button onPress={gotoNewQuestion} mode="contained">
          Add new question
        </Button>
        {questions.map((q) => (
          <ListItem {...q} key={q.id} />
        ))}
      </View>
    </ScrollView>
  );
};

export default connector(QuestionsListScreen);
