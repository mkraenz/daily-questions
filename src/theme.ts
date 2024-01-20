import { MD2LightTheme, MD2DarkTheme } from "react-native-paper";

export type FullTheme = typeof MD2LightTheme;

export enum Color {
  LightBlue = "#00C0FA",
  Blue = "#0097e6",
  DarkCorporateBlue = "#004794",
  CorporateBlue = "#005EC3",
  Grey = "#272727",
  LightGrey = "grey", // #808080
  White = "white", // #ffffff
  DarkerOrange = "#992F00", // somewhat brown
  Orange = "#AD5A00",
  LightOrange = "#E8AF4B",
}

export const lightTheme: FullTheme = {
  ...MD2LightTheme,
  roundness: 12,
  colors: {
    ...MD2LightTheme.colors,
    primary: Color.CorporateBlue,
    accent: Color.Orange,
    tooltip: Color.White,
  },
};

/** on white #F6F6F6 background, primary and accent colors have at least 7:1 contrast,
 * thus passing WCAG AAA
 */
export const highContrastLightTheme: FullTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: Color.DarkCorporateBlue,
    accent: Color.DarkerOrange,
    tooltip: Color.White,
  },
};

export const darkTheme: FullTheme = {
  ...MD2DarkTheme,
  roundness: 12,
  colors: {
    ...MD2DarkTheme.colors,
    primary: Color.LightBlue,
    accent: Color.LightOrange,
    tooltip: Color.Grey,
  },
};
