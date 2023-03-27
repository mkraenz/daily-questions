import React, { FC, PropsWithChildren, useEffect } from "react";
import { useColorScheme } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { setDarkMode } from "./settings/settings.slice";
import { RootState } from "./store";
import { darkTheme, highContrastLightTheme, lightTheme } from "./theme";

const mapState = (state: RootState) => ({
  dark: state.settings.darkMode,
  highContrast: state.accessibility.highContrast,
});
const mapDispatch = { setDarkMode };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const getTheme = (dark: boolean | null, highContrast: boolean) => {
  if (dark) return darkTheme;
  if (!dark && highContrast) return highContrastLightTheme;
  return lightTheme;
};

const ThemedApp: FC<PropsFromRedux & PropsWithChildren> = ({
  children,
  dark,
  setDarkMode,
  highContrast,
}) => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    if (dark === null) {
      setDarkMode(colorScheme === "dark");
    }
  });

  const theme = getTheme(dark, highContrast);

  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};

export default connector(ThemedApp);
