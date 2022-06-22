import { useNavigation } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { defaultQuestions } from "./default-questions";
import { QuestionsNavigationProp } from "./questions-nav";
import { addQuestion } from "./questions.slice";
import TypeSelection from "./TypeSelection";

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 16,
  },
});

const mapDispatch = { addQuestion };
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const prefixed = (str: string) => `Example: ${str}`;

const AddNewQuestionScreen: FC<PropsFromRedux> = ({ addQuestion }) => {
  const nav = useNavigation<QuestionsNavigationProp>();
  const [title, setTitle] = useState("");
  const [titleChanged, setTitleChanged] = useState(false);
  const [longQuestion, setLongQuestion] = useState("");
  const [type, setType] = useState<"points" | "fulltext">("points");

  const hasErrors = title === "";
  const addNewQuestion = () => {
    addQuestion({ title, questionLong: longQuestion, type, active: true });
    nav.goBack();
  };
  const handleTitleChanged = (text: string) => {
    setTitleChanged(true);
    setTitle(text);
  };

  return (
    <View style={[StyleSheet.absoluteFill, { justifyContent: "center" }]}>
      <TextInput
        label="Title*"
        onChangeText={handleTitleChanged}
        value={title}
        autoFocus={true}
        autoComplete="off"
        placeholder={prefixed(defaultQuestions[0].title)}
        style={styles.marginBottom}
        error={titleChanged && hasErrors}
      />
      <TextInput
        label="Full Question"
        multiline={true}
        onChangeText={setLongQuestion}
        value={longQuestion}
        autoComplete="off"
        placeholder={prefixed(defaultQuestions[0].questionLong)}
        style={styles.marginBottom}
      />
      <TypeSelection
        type={type}
        setType={setType}
        style={styles.marginBottom}
      />
      <Button mode="contained" onPress={addNewQuestion} disabled={hasErrors}>
        Create
      </Button>
    </View>
  );
};

export default connector(AddNewQuestionScreen);
