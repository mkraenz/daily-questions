import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import NavigationApp from "./NavigationApp";
import { persistor, store } from "./store";
import ThemedApp from "./ThemedApp";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemedApp>
          <NavigationApp />
        </ThemedApp>
      </PersistGate>
    </Provider>
  );
}
