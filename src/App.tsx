import React from "react";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import NavigationApp from "./NavigationApp";
import { persistor, store } from "./store";
import { darkTheme } from "./theme";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={darkTheme}>
          <NavigationApp />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
