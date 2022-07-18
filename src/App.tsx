import React from "react";
import { I18nextProvider } from "react-i18next";
import "react-native-gesture-handler";
import "react-native-get-random-values";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { myi18n } from "./localization/myi18n";
import LocalNotifications from "./LocalNotifications";
import NavigationApp from "./NavigationApp";
import { persistor, store } from "./store";
import ThemedApp from "./ThemedApp";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemedApp>
          <I18nextProvider i18n={myi18n}>
            <LocalNotifications />
            <NavigationApp />
          </I18nextProvider>
        </ThemedApp>
      </PersistGate>
    </Provider>
  );
}
