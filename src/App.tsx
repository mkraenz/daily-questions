import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import historyReducer from "./history/history.slice";
import NavigationApp from "./NavigationApp";
import settingsReducer from "./settings/settings.slice";
import { lightTheme } from "./theme";

/**
 * Logs all actions and states after they are dispatched.
 */
const logger =
  (store: any) =>
  (next: any) =>
  (action: any): any => {
    console.group(action.type);
    console.info("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
  };

// TODO move the redux stuff to avoid cyclic deps
const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  history: historyReducer,
  settings: settingsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // }).concat(logger),
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={lightTheme}>
          <NavigationApp />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
