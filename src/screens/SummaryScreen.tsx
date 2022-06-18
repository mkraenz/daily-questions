import AsyncStorage from "@react-native-async-storage/async-storage";
import { last } from "lodash";
import React, { FC, useEffect, useState } from "react";
import { ScrollView, Share, StyleSheet, Text, View } from "react-native";
import { Button, Paragraph, Title, useTheme } from "react-native-paper";
import { questions } from "../QuestionsNavApp";

const toDateOnly = (date: Date) => date.toISOString().split("T")[0];
const STORAGE_KEY = "@eu.kraenz.dailyquestions.historicanswers";

interface HistoricEntry {
  date: string;
  qs: { id: string; a: number | string }[]; // qs = questions, a = answer. shortening to save bytes since AsyncStorage is max 2MB
}
type History = HistoricEntry[];

const appendToHistory = async (today: Date, answers: (number | string)[]) => {
  const date = toDateOnly(today);
  const serializedHistory = (await AsyncStorage.getItem(STORAGE_KEY)) || "[]";
  const history: History = JSON.parse(serializedHistory);
  const newEntry: HistoricEntry = {
    date,
    qs: answers.map((a, i) => ({
      id: questions[i].id, // TODO remove cyclic dependency
      a: a,
    })),
  };

  const entryForDateAlreadyExists = last(history)?.date === date;
  if (entryForDateAlreadyExists) {
    history[history.length - 1] = newEntry;
  } else {
    history.push(newEntry);
  }
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

// TODO clean up the css
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  pointsQuestionsContainer: {
    flex: 1,
    justifyContent: "space-between",
    maxHeight: "50%",
    minHeight: "50%",
  },
  pointsAnswerRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  answerTitle: {
    paddingRight: 16,
  },
  fulltextQuestionsContainer: {
    flex: 1,
    width: "100%",
    maxHeight: "10%",
  },
  fulltextRow: {
    flex: 1,
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
  nav: (index: number) => void;
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PointsAnswer: FC<{
  title: string;
  answer: string | number;
  onClick: () => void;
}> = ({ title, answer, onClick }) => {
  const theme = useTheme();
  return (
    <View style={styles.pointsAnswerRow} onTouchEnd={onClick}>
      <Paragraph style={styles.answerTitle}>{title}</Paragraph>
      <Button
        mode="outlined"
        color={theme.colors.text}
        labelStyle={{ marginVertical: 0, paddingVertical: 9 }}
      >
        {answer}
      </Button>
    </View>
  );
};

const FullTextAnswer: FC<{
  title: string;
  answer: string | number;
  onClick: () => void;
}> = ({ title, answer, onClick }) => {
  return (
    <View style={styles.fulltextRow} onTouchEnd={onClick}>
      <Paragraph>
        {title}: {answer}
      </Paragraph>
    </View>
  );
};

const ShareWithWhatsappButton: FC<{
  handlePressed: () => void;
}> = ({ handlePressed }) => {
  return (
    <Button icon="share" mode="contained" onPress={handlePressed}>
      Whatsapp
    </Button>
  );
};

const SummaryScreen: FC<Props> = ({ questions, answers, nav }) => {
  const [secretCounter, setSecretCounter] = useState(0);
  const [history, setHistory] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      setHistory(data || "");
    };
    loadData();
  });

  const now = new Date();
  const today = toDateOnly(now);
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
    await appendToHistory(now, answers);
    await Share.share({
      message: formatExportMessage(),
    });
  };

  const increaseSecretCounter = () => {
    setSecretCounter(secretCounter + 1);
  };
  // TODO analytics screen
  if (secretCounter % 5 === 4) {
    return (
      <ScrollView
        onTouchEnd={increaseSecretCounter}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text>{history}</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Title onPress={increaseSecretCounter}>Your Dailies from {today}</Title>
      <View style={styles.pointsQuestionsContainer}>
        {questions
          .map((question, i) =>
            question.type === "points" ? (
              <PointsAnswer
                key={question.id}
                answer={answers[i]}
                title={question.title}
                onClick={() => nav(i)}
              />
            ) : null
          )
          .filter(Boolean)}
      </View>
      <View style={styles.fulltextQuestionsContainer}>
        {questions
          .map((question, i) =>
            question.type === "points" ? null : (
              <FullTextAnswer
                key={question.id}
                answer={answers[i]}
                title={question.title}
                onClick={() => nav(i)}
              />
            )
          )
          .filter(Boolean)}
      </View>
      <ShareWithWhatsappButton handlePressed={handleSharePressed} />
    </ScrollView>
  );
};

export default SummaryScreen;
