import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Paragraph, TextInput, Title } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import { selectAnswerList } from "./dailies.selectors";

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
  onAnswer: (answer: number | string) => void;
  answer: number | string;
}

const mapState = (state: RootState) => ({
  answerList: selectAnswerList(state),
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const FulltextQuestionScreen: FC<Props & PropsFromRedux> = ({
  title,
  questionLong,
  answer,
  onAnswer,
  answerList,
}) => {
  const { t } = useTranslation();
  const [text, setText] = useState(answer?.toString() ?? "");
  const onNext = () => onAnswer(text);

  return (
    <View style={styles.contentContainer}>
      <Title style={styles.title}>{title}</Title>
      <Paragraph>{questionLong}</Paragraph>
      <TextInput
        label={title}
        multiline={true}
        onChangeText={setText}
        value={text}
        autoFocus={true}
        style={styles.textInput}
        autoComplete="off"
      />
      <Button onPress={onNext} style={styles.button} mode="outlined">
        {t("dailies:next")}
      </Button>
      <Paragraph>{answerList}</Paragraph>
    </View>
  );
};

export default connector(FulltextQuestionScreen);
