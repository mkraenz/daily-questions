import React, { FC, useEffect } from "react";
import { useColorScheme } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { setDarkMode } from "./settings/settings.slice";
import { RootState } from "./store";
import { darkTheme, lightTheme } from "./theme";

const mapState = (state: RootState) => ({
  dark: state.settings.darkMode,
});
const mapDispatch = { setDarkMode };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ThemedApp: FC<PropsFromRedux> = ({ children, dark, setDarkMode }) => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    if (dark === null) {
      setDarkMode(colorScheme === "dark");
    }
  });

  return (
    <PaperProvider theme={dark ? darkTheme : lightTheme}>
      {children}
    </PaperProvider>
  );
};

export default connector(ThemedApp);
