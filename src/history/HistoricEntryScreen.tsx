import { isInteger, isString } from "lodash";
import React, { FC } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  MD2Theme,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";
import { useTranslation } from "../localization/useTranslations";
import { HistoricEntryParams } from "./history-nav";

const styles = StyleSheet.create({
  container: {
    marginVertical: 32,
    marginHorizontal: 24,
  },
  contentContainer: {
    alignItems: "center",
  },
  title: {
    marginBottom: 24,
  },
  pointsQuestionsContainer: {
    marginBottom: 24,
  },
  pointsAnswerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  answerTitle: {
    paddingRight: 16,
  },
  fulltextQuestionsContainer: {
    width: "100%",
    marginBottom: 24,
  },
  fulltextRow: { marginBottom: 12 },
});

const PointsAnswer: FC<{
  title?: string;
  answer: string | number;
}> = ({ title, answer }) => {
  const theme = useTheme<MD2Theme>();
  const { t } = useTranslation();
  return (
    <View
      style={styles.pointsAnswerRow}
      accessibilityRole="text"
      accessibilityLabel={t("dailies:answerRowA11yLabel", {
        questionTitle: title,
        answer,
      })}
    >
      <Paragraph style={styles.answerTitle}>
        {title ?? t("history:questionNotFound")}
      </Paragraph>
      <Button
        mode="outlined"
        color={theme.colors.text}
        accessibilityRole="text"
        accessible={false}
      >
        {answer}
      </Button>
    </View>
  );
};

const FullTextAnswer: FC<{
  title?: string;
  answer: string | number;
}> = ({ title, answer }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.fulltextRow}>
      <Paragraph>
        {title ?? t("history:questionNotFound")}: {answer}
      </Paragraph>
    </View>
  );
};

const HistoricEntryScreen: FC<{ route: { params: HistoricEntryParams } }> = (
  props
) => {
  const { t } = useTranslation();
  const { date, questions } = props.route.params;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Title style={styles.title} accessibilityRole="header">
        {t("dailies:summaryHeader", { today: date })}
      </Title>
      <View style={styles.pointsQuestionsContainer}>
        {questions
          .filter(
            (q) =>
              q.type === "points" ||
              (q.type === undefined && isInteger(q.answer))
          )
          .map((question) => (
            <PointsAnswer
              key={question.id}
              answer={question.answer}
              title={question.title}
            />
          ))}
      </View>
      <View style={styles.fulltextQuestionsContainer}>
        {questions
          .filter(
            (q) =>
              q.type === "fulltext" ||
              (q.type === undefined && isString(q.answer))
          )
          .map((question) => (
            <FullTextAnswer
              key={question.id}
              answer={question.answer}
              title={question.title}
            />
          ))}
      </View>
    </ScrollView>
  );
};

export default HistoricEntryScreen;
