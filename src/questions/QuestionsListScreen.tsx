import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Button, List } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import { QuestionsNavigationProp } from "./questions-nav";
import { moveQuestion, Question } from "./questions.slice";

const ListItem: FC<RenderItemParams<Question>> = ({ item, drag, isActive }) => {
  const { title, questionLong, type, id, active } = item;
  const icon = type === "points" ? "numeric" : "format-color-text";
  const nav = useNavigation<QuestionsNavigationProp>();
  const gotoEditQuestion = () => {
    nav.push("Edit Question", { questionLong, type, id, title, active });
  };
  return (
    <ScaleDecorator>
      <List.Item
        onPress={gotoEditQuestion}
        title={title}
        description={questionLong}
        left={(props) => <List.Icon {...props} icon={icon} />}
        onLongPress={drag}
        disabled={isActive}
      />
    </ScaleDecorator>
  );
};

const mapState = (state: RootState) => ({
  questions: state.questions.questions,
});
const mapDispatch = {
  moveQuestion,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const QuestionsListScreen: FC<PropsFromRedux> = ({
  questions,
  moveQuestion,
}) => {
  const activeQuestions = questions.filter((q) => q.active); // TODO read selector docs https://redux.js.org/usage/deriving-data-selectors
  const nav = useNavigation<QuestionsNavigationProp>();
  const gotoNewQuestion = () => nav.push("Add new question");

  return (
    <NestableScrollContainer style={{ marginVertical: 20 }}>
      <Button
        onPress={gotoNewQuestion}
        mode="contained"
        style={{ marginVertical: 20 }}
      >
        Add new question
      </Button>
      <NestableDraggableFlatList
        data={activeQuestions}
        renderItem={ListItem}
        keyExtractor={(q) => q.id}
        onDragEnd={({ to, data }) => {
          moveQuestion({ to, id: data[to].id });
        }}
      />
    </NestableScrollContainer>
  );
};

export default connector(QuestionsListScreen);
