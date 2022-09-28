import { inRange } from "lodash";
import React, { FC, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
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
    justifyContent: "space-evenly",
    alignItems: "center",
    minHeight: 280,
  },
  title: {
    fontSize: 32,
    paddingVertical: 4, // quickfix: title gets clipped at top without padding
  },
  button: {
    width: "75%",
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
  autoNavigateToNextScreen?: boolean;
}

const mapState = (state: RootState) => ({
  answerList: selectAnswerList(state),
  howToPlaceholderVisible:
    state.settings.pointQuestionsInputPlaceholderShownInDailies,
  autoNavigateToNextScreen: !state.accessibility.disableAutoNavigationOnAnswer,
  autofocusEnabled: !state.accessibility.autofocusDisabled,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const parsePoints = (input: string) => {
  const newText = input[input.length - 1] ?? "";
  const parsedText = parseInt(newText.replace(/[^0-9]/g, ""), 10);
  return parsedText === 0 ? 10 : parsedText;
};

const PointsQuestionScreen: FC<Props & PropsFromRedux> = ({
  title,
  questionLong,
  answer,
  onAnswer,
  answerList,
  howToPlaceholderVisible,
  autoNavigateToNextScreen,
  autofocusEnabled,
}) => {
  const { t } = useTranslation();
  const [answerInput, setAnswerInput] = useState(answer?.toString() ?? "");

  const handleChangeText = (text: string | undefined): void => {
    if (!text) return;
    const points = parsePoints(text);
    if (inRange(points, 1, 11)) {
      setAnswerInput(points.toString());
      if (autoNavigateToNextScreen) onAnswer(points);
    }
  };
  const handleNext = () => {
    const points = parsePoints(answerInput);
    if (inRange(points, 1, 11)) onAnswer(points);
  };
  const nextButtonDisabled = !inRange(parsePoints(answerInput), 1, 11);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Title style={styles.title} accessibilityRole="header">
        {title}
      </Title>
      <Paragraph>{questionLong}</Paragraph>
      <TextInput
        label={title}
        keyboardType="numeric"
        onChangeText={handleChangeText}
        value={answerInput}
        placeholder={
          howToPlaceholderVisible
            ? t("dailies:pointsQuestionPlaceholder")
            : undefined
        }
        autoFocus={autofocusEnabled}
        style={[
          styles.input,
          {
            height: 72,
          },
        ]}
        autoComplete="off"
        onSubmitEditing={handleNext}
        accessibilityLabel={t("dailies:pointsQuestionInputA11yLabel", {
          questionTitle: title,
          questionLong,
        })}
        accessibilityHint={
          autoNavigateToNextScreen
            ? t("dailies:pointsQuestionInputWithAutoNavigateA11yHint")
            : t("dailies:pointsQuestionInputWithoutAutoNavigateA11yHint")
        }
      />

      <Paragraph
        accessibilityLabel={t("dailies:shortAnswerListA11yLabel", {
          answers: answerList,
        })}
      >
        {answerList}
      </Paragraph>

      {!autoNavigateToNextScreen && (
        <Button
          onPress={handleNext}
          style={styles.button}
          mode="outlined"
          accessibilityLabel={t("dailies:next")}
          accessibilityHint={t("dailies:nextA11yHint")}
          disabled={nextButtonDisabled}
        >
          {t("dailies:next")}
        </Button>
      )}
    </ScrollView>
  );
};

export default connector(PointsQuestionScreen);
