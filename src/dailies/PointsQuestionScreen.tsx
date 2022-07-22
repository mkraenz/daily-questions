import { inRange } from "lodash";
import React, { FC } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import { Paragraph, TextInput, Title } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import { selectAnswerList } from "./dailies.selectors";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    paddingVertical: 4, // quickfix: title gets clipped at top without padding
  },
  input: {
    width: "100%",
  },
});

interface Props {
  title: string;
  questionLong: string;
  onAnswer: (answer: number | string) => void;
  answer: number | string;
}

const mapState = (state: RootState) => ({
  answerList: selectAnswerList(state),
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const PointsQuestionScreen: FC<Props & PropsFromRedux> = ({
  title,
  questionLong,
  answer,
  onAnswer,
  answerList,
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
    handleChangeText(answer.toString() ?? "");
  };

  return (
    <View style={styles.contentContainer}>
      <Title style={styles.title} accessibilityRole="header">
        {title}
      </Title>
      <Paragraph>{questionLong}</Paragraph>
      <TextInput
        label={title}
        keyboardType="numeric"
        onChangeText={handleChangeText}
        value={answer?.toString() ?? ""}
        autoFocus={true}
        style={styles.input}
        autoComplete="off"
        onSubmitEditing={handleSubmitEditing}
      />
      <Paragraph>{answerList}</Paragraph>
    </View>
  );
};

export default connector(PointsQuestionScreen);
