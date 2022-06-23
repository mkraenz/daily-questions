import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox } from "react-native-paper";

interface Question {
  id: string;
  title: string;
  checked: boolean;
  color: string;
}

interface Props {
  selectedQuestions: Question[];
  setSelectedQuestions: (questions: Question[]) => void;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});

const ChartSelection: FC<Props> = ({
  selectedQuestions,
  setSelectedQuestions,
}) => {
  return (
    <View style={styles.container}>
      {selectedQuestions.map((q, i) => {
        return (
          <View key={q.id}>
            <Checkbox.Item
              key={q.id}
              label={q.title}
              status={q.checked ? "checked" : "unchecked"}
              onPress={() => {
                const newSelectedQuestions = [...selectedQuestions];
                newSelectedQuestions[i] = { ...q, checked: !q.checked };
                setSelectedQuestions(newSelectedQuestions);
              }}
              color={q.color}
            />
          </View>
        );
      })}
    </View>
  );
};

export default ChartSelection;
