import React from "react";
import { I18nextProvider } from "react-i18next";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AccessibleByScreenReaderContainer from "./accessibility/AccessibleByScreenReaderContainer";
import DetectAccessibilityServices from "./accessibility/DetectAccessibilityServices";
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
            <DetectAccessibilityServices />
            <AccessibleByScreenReaderContainer>
              <NavigationApp />
            </AccessibleByScreenReaderContainer>
          </I18nextProvider>
        </ThemedApp>
      </PersistGate>
    </Provider>
  );
}
