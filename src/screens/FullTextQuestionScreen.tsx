import { isInteger, noop } from "lodash";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Paragraph, TextInput, Title } from "react-native-paper";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
  },
  textInput: {
    width: "100%",
  },
  button: {
    width: "75%",
  },
  hidden: {
    display: "none",
  },
});

interface Props {
  title: string;
  questionLong: string;
  index: number;
  onAnswer: (value: string | number) => void;
  answers: (number | string)[];
  visible: boolean;
}

const FullTextQuestionScreen: FC<Props> = ({
  title,
  questionLong,
  onAnswer,
  index,
  answers,
  visible,
}) => {
  const [text, setText] = useState(answers[index]?.toString() ?? "");
  const onNext = () => onAnswer(text);
  return (
    <View style={visible ? styles.contentContainer : styles.hidden}>
      {/* consider left right nav in ebook reader style */}
      <Title style={styles.title}>{title}</Title>
      <Paragraph>{questionLong}</Paragraph>
      <TextInput
        label={title}
        multiline={true}
        onChangeText={setText}
        value={text}
        autoFocus={true}
        style={styles.textInput}
        onPressIn={noop}
        onPressOut={noop}
        autoComplete="off"
      />
      <Button onPress={onNext} style={styles.button} mode="outlined">
        Next
      </Button>
      {/* once Summary has been shown for the first time, this becomes a buttonish thing that jumps back to the Summary */}
      <Paragraph>{answers.filter(isInteger).join(" ")}</Paragraph>
    </View>
  );
};

export default FullTextQuestionScreen;
