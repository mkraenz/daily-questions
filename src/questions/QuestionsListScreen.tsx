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
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import { QuestionsNavigationProp } from "./questions-nav";
import { selectActiveQuestions } from "./questions.selectors";
import { moveQuestion, Question } from "./questions.slice";

const ListItem: FC<RenderItemParams<Question>> = ({ item, drag, isActive }) => {
  const nav = useNavigation<QuestionsNavigationProp>();
  const { t } = useTranslation();

  const { title, questionLong, type, id, active } = item;
  const icon = type === "points" ? "numeric" : "format-color-text";
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
        accessibilityLabel={title}
        accessibilityRole="button"
        accessibilityHint={t("questions:listItemA11yHint")}
      />
    </ScaleDecorator>
  );
};

const mapState = (state: RootState) => ({
  activeQuestions: selectActiveQuestions(state),
});
const mapDispatch = {
  moveQuestion,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const QuestionsListScreen: FC<PropsFromRedux> = ({
  activeQuestions,
  moveQuestion,
}) => {
  const nav = useNavigation<QuestionsNavigationProp>();
  const { t } = useTranslation();
  const gotoNewQuestion = () => nav.push("Add new question");

  return (
    <NestableScrollContainer
      style={{ marginVertical: 20, paddingHorizontal: 12 }}
    >
      <Button
        onPress={gotoNewQuestion}
        mode="contained"
        style={{ marginVertical: 20 }}
        accessibilityLabel={t("questions:addNewQuestion")}
        accessibilityHint={t("questions:addNewQuestionA11yHint")}
      >
        {t("questions:addNewQuestion")}
      </Button>
      <NestableDraggableFlatList
        data={activeQuestions}
        renderItem={ListItem}
        keyExtractor={(q) => q.id}
        onDragEnd={({ to, data }) => {
          moveQuestion({ to, id: data[to].id });
        }}
        accessibilityRole="list"
      />
    </NestableScrollContainer>
  );
};

export default connector(QuestionsListScreen);
