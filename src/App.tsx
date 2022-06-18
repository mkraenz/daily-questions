import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import historyReducer from "./history/history.slice";
import NavigationApp from "./NavigationApp";
import { lightTheme } from "./theme";

export const store = configureStore({
  reducer: {
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={lightTheme}>
        <NavigationApp />
      </PaperProvider>
    </Provider>
  );
}
