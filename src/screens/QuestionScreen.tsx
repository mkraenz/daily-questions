import { inRange, isInteger, noop } from "lodash";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Paragraph, TextInput, Title } from "react-native-paper";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  hidden: {
    display: "none",
  },
});

interface Props {
  title: string;
  questionLong: string;
  index: number;
  onAnswer: (answer: number | string) => void;
  answers: (number | string)[];
  visible: boolean;
}

const QuestionScreen: FC<Props> = ({
  title,
  questionLong,
  index,
  onAnswer,
  answers,
  visible,
}) => {
  const handleChangeText = (text: string | undefined): void => {
    if (!text) return;
    const newText = text[text.length - 1];
    const parsedText = parseInt(newText.replace(/[^0-9]/g, ""), 10);
    const points = parsedText === 0 ? 10 : parsedText;
    if (inRange(points, 1, 11)) onAnswer(points);
  };
  return (
    <View style={visible ? styles.contentContainer : styles.hidden}>
      {/* consider left right nav in ebook reader style */}
      <Title
        style={{
          fontSize: 32,
        }}
      >
        {title}
      </Title>
      <Paragraph>{questionLong}</Paragraph>
      <TextInput
        label={title}
        keyboardType="numeric"
        onChangeText={handleChangeText}
        value={answers[index]?.toString() ?? ""}
        autoFocus={true}
        style={{
          width: "100%",
        }}
        autoComplete="off"
        onPressIn={noop}
        onPressOut={noop}
      />
      {/* once Summary has been shown for the first time, this becomes a buttonish thing that jumps back to the Summary */}
      <Paragraph>{answers.filter(isInteger).join(" ")}</Paragraph>
    </View>
  );
};

export default QuestionScreen;
