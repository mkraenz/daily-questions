import { isNumber } from "lodash";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { questions } from "../QuestionsNavApp";

const mockHistory = [
  {
    date: "2020-01-01",
    qs: [
      { id: "a5e36d31", a: 4 },
      { id: "063c6ce1", a: 6 },
      { id: "aa73eb84", a: 2 },
      { id: "e881e50e", a: 8 },
      { id: "ec57f75e", a: 10 },
      { id: "b1667166", a: 4 },
      { id: "c5c844e6", a: 5 },
      { id: "b875a18e", a: "Improving the daily questions app" },
      {
        id: "c706f049",
        a: "Go Shopping since tomorrow's a holiday",
      },
    ],
  },
  {
    date: "2020-01-02",
    qs: [
      { id: "a5e36d31", a: 5 },
      { id: "063c6ce1", a: 3 },
      { id: "aa73eb84", a: 3 },
      { id: "e881e50e", a: 3 },
      { id: "ec57f75e", a: 10 },
      { id: "b1667166", a: 3 },
      { id: "c5c844e6", a: 3 },
      { id: "b875a18e", a: "Improving the daily questions app" },
      {
        id: "c706f049",
        a: "Go Shopping since tomorrow's a holiday",
      },
    ],
  },
  {
    date: "2020-01-03",
    qs: [
      { id: "a5e36d31", a: 8 },
      { id: "063c6ce1", a: 8 },
      { id: "aa73eb84", a: 8 },
      { id: "e881e50e", a: 8 },
      { id: "ec57f75e", a: 8 },
      { id: "b1667166", a: 8 },
      { id: "c5c844e6", a: 8 },
      { id: "b875a18e", a: "Improving the daily questions app" },
      {
        id: "c706f049",
        a: "Go Shopping since tomorrow's a holiday",
      },
    ],
  },
  {
    date: "2020-01-04",
    qs: [
      { id: "a5e36d31", a: 2 },
      { id: "063c6ce1", a: 2 },
      { id: "aa73eb84", a: 2 },
      { id: "e881e50e", a: 2 },
      { id: "ec57f75e", a: 2 },
      { id: "b1667166", a: 2 },
      { id: "c5c844e6", a: 2 },
      { id: "b875a18e", a: "Improving the daily questions app" },
      {
        id: "c706f049",
        a: "Go Shopping since tomorrow's a holiday",
      },
    ],
  },
  {
    date: "2020-01-05",
    qs: [
      { id: "a5e36d31", a: 2 },
      { id: "063c6ce1", a: 2 },
      { id: "aa73eb84", a: 2 },
      { id: "e881e50e", a: 2 },
      { id: "ec57f75e", a: 2 },
      { id: "b1667166", a: 2 },
      { id: "c5c844e6", a: 2 },
      { id: "b875a18e", a: "Improving the daily questions app" },
      {
        id: "c706f049",
        a: "Go Shopping since tomorrow's a holiday",
      },
    ],
  },
  {
    date: "2020-01-06",
    qs: [
      { id: "a5e36d31", a: 2 },
      { id: "063c6ce1", a: 2 },
      { id: "aa73eb84", a: 2 },
      { id: "e881e50e", a: 2 },
      { id: "ec57f75e", a: 2 },
      { id: "b1667166", a: 2 },
      { id: "c5c844e6", a: 2 },
      { id: "b875a18e", a: "Improving the daily questions app" },
      {
        id: "c706f049",
        a: "Go Shopping since tomorrow's a holiday",
      },
    ],
  },
  {
    date: "2020-01-07",
    qs: [
      { id: "a5e36d31", a: 2 },
      { id: "063c6ce1", a: 2 },
      { id: "aa73eb84", a: 2 },
      { id: "e881e50e", a: 2 },
      { id: "ec57f75e", a: 2 },
      { id: "b1667166", a: 2 },
      { id: "c5c844e6", a: 2 },
      { id: "b875a18e", a: "Improving the daily questions app" },
      {
        id: "c706f049",
        a: "Go Shopping since tomorrow's a holiday",
      },
    ],
  },
];

const questionsidsWithNumberValues = mockHistory[0].qs
  .filter((q): q is { id: string; a: number } => isNumber(q.a))
  .map((q) => q.id);

const StatisticsScreen = () => {
  return (
    <View>
      <Text>{questions[0].title}</Text>
      <LineChart
        data={{
          labels: mockHistory.map((h) => h.date),
          datasets: questionsidsWithNumberValues.map((questionId, index) => {
            const timeseries = mockHistory.map(
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
