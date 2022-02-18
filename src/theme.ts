import { DarkTheme, DefaultTheme } from "react-native-paper";

export type FullTheme = typeof DefaultTheme;

export enum Color {
  Blue = "#1084ff",
  Grey = "#272727",
  LightGrey = "grey", // #808080
  White = "white", // #ffffff
}

export const lightTheme: FullTheme = {
  ...DefaultTheme,
  roundness: 12,
  colors: {
    ...DefaultTheme.colors,
    onSurface: Color.Blue,
    primary: Color.Blue,
    accent: Color.Blue,
  },
};

export const darkTheme: FullTheme = {
  ...DarkTheme,
  roundness: 12,
  colors: {
    ...DarkTheme.colors,
    primary: Color.Blue,
    onSurface: Color.Blue,
    accent: Color.Blue,
  },
};
