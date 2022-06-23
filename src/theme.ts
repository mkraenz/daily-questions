import { DarkTheme, DefaultTheme } from "react-native-paper";

export type FullTheme = typeof DefaultTheme;

export enum Color {
  Blue = "#1084ff",
  Grey = "#272727",
  LightGrey = "grey", // #808080
  White = "white", // #ffffff
  Orange = "#A27A34",
}

export const lightTheme: FullTheme = {
  ...DefaultTheme,
  roundness: 12,
  colors: {
    ...DefaultTheme.colors,
    primary: Color.Blue,
    accent: Color.Orange,
  },
};

export const darkTheme: FullTheme = {
  ...DarkTheme,
  roundness: 12,
  colors: {
    ...DarkTheme.colors,
    primary: Color.Blue,
    accent: Color.Orange,
  },
};
