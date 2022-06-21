import React, { FC } from "react";
import { LineChart } from "react-native-chart-kit";
import { useTheme } from "react-native-paper";
import { History } from "../history/history.slice";

const getXLabels = (history: History, modulo: number = 2) =>
  history.map((h) => toMMDD(h.date)).filter((_, i) => i % modulo === 0);
/** @example for input 2020-01-24, it returns 01-24 */
const toMMDD = (dateOnly: string) => dateOnly.slice(5);

interface Props {
  selectedQuestions: {
    id: string;
    color: string;
    checked: boolean;
  }[];
  history: History;
  width: number;
}

const Chart: FC<Props> = ({ selectedQuestions, history, width }) => {
  const theme = useTheme();

  return (
    <LineChart
      data={{
        labels: getXLabels(history),
        datasets: selectedQuestions
          .filter((q) => q.checked)
          .map((question) => {
            const timeseries = history.map(
              (entry) =>
                (entry.qs.find((q) => q.id === question.id)?.a as number) ?? 0
            );
            const color = (opacity = 1) => question.color;

            return {
              data: timeseries,
              color,
            };
          }),
      }}
      width={width}
      height={500}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: theme.colors.surface,
        backgroundGradientFrom: theme.colors.background,
        backgroundGradientTo: theme.colors.background,
        decimalPlaces: 0,
        color: (opacity = 1) => theme.colors.text,
        labelColor: (opacity = 1) => theme.colors.text,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: theme.colors.placeholder,
        },
      }}
      bezier
      style={{
        paddingVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default Chart;