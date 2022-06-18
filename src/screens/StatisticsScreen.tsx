import { isNumber } from "lodash";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useStore } from "react-redux";
import { RootState } from "../App";
import { questions } from "../questions/default-questions";

const StatisticsScreen = () => {
  const store = useStore<RootState>();
  const history = store.getState().history.history; // TODO

  if (history.length === 0 || history.length === 1) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No history yet</Text>
      </View>
    );
  }

  const questionsidsWithNumberValues = history[0].qs
    .filter((q): q is { id: string; a: number } => isNumber(q.a))
    .map((q) => q.id);
  return (
    <View>
      <Text>{questions[0].title}</Text>
      <LineChart
        data={{
          labels: history.map((h) => h.date),
          datasets: questionsidsWithNumberValues.map((questionId, index) => {
            const timeseries = history.map(
              (entry) =>
                (entry.qs.find((q) => q.id === questionId)?.a as number) ?? 0
            );
            const interpolatedRedValue = Math.floor(
              (255 * index) / questionsidsWithNumberValues.length
            );
            const color = (opacity = 1) =>
              `rgba(${interpolatedRedValue}, 0, 0, ${opacity})`;

            return {
              data: timeseries,
              color,
            };
          }),
        }}
        width={Dimensions.get("window").width}
        height={500}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default StatisticsScreen;
