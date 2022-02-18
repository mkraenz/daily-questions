import React from "react";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import NavigationApp from "./NavigationApp";
import { lightTheme } from "./theme";

export default function App() {
  return (
    <PaperProvider theme={lightTheme}>
      <NavigationApp />
    </PaperProvider>
  );
}
