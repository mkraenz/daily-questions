import { inRange, isInteger } from "lodash";
import React, { FC } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
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
  title: {
    fontSize: 32,
  },
  input: {
    width: "100%",
  },
});

interface Props {
  title: string;
  questionLong: string;
  index: number;
  onAnswer: (answer: number | string) => void;
  answers: (number | string)[];
}

const PointsQuestionScreen: FC<Props> = ({
  title,
  questionLong,
  index,
  onAnswer,
  answers,
}) => {
  const handleChangeText = (text: string | undefined): void => {
    if (!text) return;
    const newText = text[text.length - 1];
    const parsedText = parseInt(newText.replace(/[^0-9]/g, ""), 10);
    const points = parsedText === 0 ? 10 : parsedText;
    if (inRange(points, 1, 11)) onAnswer(points);
  };
  const handleSubmitEditing = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ): void => {
    handleChangeText(answers[index]?.toString() ?? "");
  };

  return (
    <View style={styles.contentContainer}>
      <Title style={styles.title}>{title}</Title>
      <Paragraph>{questionLong}</Paragraph>
      <TextInput
        label={title}
        keyboardType="numeric"
        onChangeText={handleChangeText}
        value={answers[index]?.toString() ?? ""}
        autoFocus={true}
        style={styles.input}
        autoComplete="off"
        onSubmitEditing={handleSubmitEditing}
      />
      {/* once Summary has been shown for the first time, this becomes a buttonish thing that jumps back to the Summary */}
      <Paragraph>{answers.filter(isInteger).join(" ")}</Paragraph>
    </View>
  );
};

export default PointsQuestionScreen;
