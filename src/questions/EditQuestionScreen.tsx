import { useNavigation } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import ArchiveConfirmationDialog from "./ArchiveConfirmationDialog";
import type {
  QuestionsNavigationProp,
  QuestionsStackParamList,
} from "./questions-nav";
import { archiveQuestion, editQuestion } from "./questions.slice";
import TypeSelection from "./TypeSelection";

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 16,
  },
});

const mapDispatch = { editQuestion, archiveQuestion };
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const EditQuestionsScreen: FC<
  PropsFromRedux & StackScreenProps<QuestionsStackParamList, "Edit Question">
> = ({ editQuestion, archiveQuestion, route }) => {
  const { title, id, questionLong, type, active } = route.params;
  const nav = useNavigation<QuestionsNavigationProp>();
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedQuestionLong, setEditedQuestionLong] = useState(questionLong);
  const [editedType, setEditedType] = useState<"points" | "fulltext">(type);

  const [archiveConfirmationShown, showArchiveConfirmation] =
    React.useState(false);

  const theme = useTheme();

  const saveEdits = () => {
    editQuestion({
      title: editedTitle,
      questionLong: editedQuestionLong,
      type: editedType,
      id,
      active,
    });
    nav.goBack();
  };

  const archiveThisQuestion = () => {
    archiveQuestion({ id });
    showArchiveConfirmation(false);
    nav.goBack();
  };

  return (
    <View style={[StyleSheet.absoluteFill, { justifyContent: "center" }]}>
      <TextInput
        label="Title"
        onChangeText={setEditedTitle}
        value={editedTitle}
        autoFocus={true}
        autoComplete="off"
        style={styles.marginBottom}
      />
      <TextInput
        label="Full Question"
        multiline={true}
        onChangeText={setEditedQuestionLong}
        value={editedQuestionLong}
        autoComplete="off"
        style={styles.marginBottom}
      />
      <TypeSelection
        type={editedType}
        setType={setEditedType}
        style={styles.marginBottom}
      />
      <Button mode="contained" onPress={saveEdits} style={styles.marginBottom}>
        Save Changes
      </Button>
      <Button
        mode="contained"
        color={theme.colors.error}
        onPress={() => showArchiveConfirmation(true)}
      >
        Archive Question
      </Button>
      <ArchiveConfirmationDialog
        visible={archiveConfirmationShown}
        onCancel={() => showArchiveConfirmation(false)}
        onConfirm={archiveThisQuestion}
      />
    </View>
  );
};

export default connector(EditQuestionsScreen);