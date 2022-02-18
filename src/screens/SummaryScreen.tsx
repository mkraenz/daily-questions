import React, { FC } from "react";
import { Share, StyleSheet, View } from "react-native";
import { Button, Paragraph, Title } from "react-native-paper";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  questionsContainer: {
    display: "flex",
    justifyContent: "flex-start",
  },
});

interface Props {
  questions: {
    title: string;
    id: string;
    questionLong: string;
    type: "points" | "fulltext";
  }[];
  answers: (number | string)[];
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SummaryScreen: FC<Props> = ({ questions, answers }) => {
  const today = new Date().toISOString().split("T")[0];
  const formatExportMessage = () => {
    const body = questions
      .map((q, i) => {
        const maybeNewLine = q.type === "fulltext" ? "\n" : "";
        return `${maybeNewLine}${q.title}: ${answers[i]}`;
      })
      .join("\n");
    const weekday = days[new Date().getDay()];
    const header = `${today} ${weekday}\n\n`;
    return `${header}${body}`;
  };
  const handleSharePressed = async () => {
    await Share.share({
      message: formatExportMessage(),
    });
  };
  return (
    <View style={styles.contentContainer}>
      <Title>Your Dailies from {today}</Title>
      <View style={styles.questionsContainer}>
        {questions.map((question, i) => (
          <Paragraph key={question.id}>
            {/* consider color coding the numbers, green greener greenest */}
            {question.title}: {answers[i]}
          </Paragraph>
        ))}
      </View>
      <Button icon="share" mode="contained" onPress={handleSharePressed}>
        Whatsapp
      </Button>
    </View>
  );
};

export default SummaryScreen;
