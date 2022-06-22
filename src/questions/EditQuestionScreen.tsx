import { useNavigation } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import type {
  QuestionsNavigationProp,
  QuestionsStackParamList,
} from "./questions-nav";
import { editQuestion } from "./questions.slice";
import TypeSelection from "./TypeSelection";

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 16,
  },
});

const mapDispatch = { editQuestion };
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const EditQuestionsScreen: FC<
  PropsFromRedux & StackScreenProps<QuestionsStackParamList, "Edit Question">
> = ({ editQuestion, route }) => {
  const { title, id, questionLong, type } = route.params;
  const nav = useNavigation<QuestionsNavigationProp>();
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedQuestionLong, setEditedQuestionLong] = useState(questionLong);
  const [editedType, setEditedType] = useState<"points" | "fulltext">(type);

  const saveEdits = () => {
    editQuestion({
      title: editedTitle,
      questionLong: editedQuestionLong,
      type: editedType,
      id,
    });
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
      <Button mode="contained" onPress={saveEdits}>
        Save Changes
      </Button>
    </View>
  );
};

export default connector(EditQuestionsScreen);
