import React, { FC } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "./store";
import { darkTheme, lightTheme } from "./theme";

const mapState = (state: RootState) => ({
  dark: state.settings.darkMode,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ThemedApp: FC<PropsFromRedux> = ({ children, dark }) => {
  return (
    <PaperProvider theme={dark ? darkTheme : lightTheme}>
      {children}
    </PaperProvider>
  );
};

export default connector(ThemedApp);
