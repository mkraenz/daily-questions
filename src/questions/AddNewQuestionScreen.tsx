import { useNavigation } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { v4 } from "uuid";
import { defaultQuestions } from "./default-questions";
import { CustomizeQuestionsScreenNavigationProp } from "./questions-nav";
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
  const nav = useNavigation<CustomizeQuestionsScreenNavigationProp>();
  const [title, setTitle] = useState("");
  const [longQuestion, setLongQuestion] = useState("");
  const [type, setType] = useState<"points" | "fulltext">("points");

  const addNewQuestion = () => {
    const id = v4().split("-")[0];
    addQuestion({ title, questionLong: longQuestion, type, id });
    nav.goBack();
  };

  return (
    <View style={[StyleSheet.absoluteFill, { justifyContent: "center" }]}>
      <TextInput
        label="Title"
        onChangeText={setTitle}
        value={title}
        autoFocus={true}
        //   style={styles.textInput}
        //   onPressIn={noop}
        //   onPressOut={noop}
        autoComplete="off"
        placeholder={prefixed(defaultQuestions[0].title)}
        style={styles.marginBottom}
      />
      <TextInput
        label="Full Question"
        multiline={true}
        onChangeText={setLongQuestion}
        value={longQuestion}
        // style={styles.textInput}
        // onPressIn={noop}
        // onPressOut={noop}
        autoComplete="off"
        placeholder={prefixed(defaultQuestions[0].questionLong)}
        style={styles.marginBottom}
      />
      <TypeSelection
        type={type}
        setType={setType}
        style={styles.marginBottom}
      />
      <Button mode="contained" onPress={addNewQuestion}>
        Create
      </Button>
    </View>
  );
};

export default connector(AddNewQuestionScreen);
