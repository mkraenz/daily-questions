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
    minHeight: 280,
  },
  title: {
    fontSize: 32,
    paddingVertical: 4, // quickfix: title gets clipped at top without padding
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
  autofocusEnabled: !state.accessibility.autofocusDisabled,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const FulltextQuestionScreen: FC<Props & PropsFromRedux> = ({
  title,
  questionLong,
  answer,
  onAnswer,
  answerList,
  autofocusEnabled,
}) => {
  const { t } = useTranslation();
  const [text, setText] = useState(answer?.toString() ?? "");
  const [errored, setError] = useState(false);

  const onNext = () => {
    if (!text) {
      setError(true);
      return;
    }
    onAnswer(text);
  };

  const handleChangeText = (newText: string) => {
    setError(false);
    setText(newText);
  };

  return (
    <View style={styles.contentContainer}>
      <Title style={styles.title}>{title}</Title>
      <Paragraph>{questionLong}</Paragraph>
      <TextInput
        label={title}
        multiline={true}
        onChangeText={handleChangeText}
        value={text}
        autoFocus={autofocusEnabled}
        style={styles.textInput}
        autoComplete="off"
        error={errored}
      />
      <Button
        onPress={onNext}
        style={styles.button}
        mode="outlined"
        accessibilityLabel={t("dailies:next")}
        accessibilityHint={t("dailies:nextA11yHint")}
        disabled={!text}
      >
        {t("dailies:next")}
      </Button>
      <Paragraph
        accessibilityLabel={t("dailies:shortAnswerListA11yLabel", {
          answers: answerList,
        })}
      >
        {answerList}
      </Paragraph>
    </View>
  );
};

export default connector(FulltextQuestionScreen);
