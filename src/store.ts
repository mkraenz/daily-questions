import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import "react-native-gesture-handler";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import historyReducer, { HistoryState } from "./history/history.slice";
import questionsReducer, { QuestionsState } from "./questions/questions.slice";
import settingsReducer, { SettingsState } from "./settings/settings.slice";

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

const persistConfig: PersistConfig<{
  history: HistoryState;
  settings: SettingsState;
  questions: QuestionsState;
}> = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  whitelist: ["history", "settings", "questions"],
};
const rootReducer = combineReducers({
  history: historyReducer,
  settings: settingsReducer,
  questions: questionsReducer,
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
  // }).concat(logger), // For dev: enable as necessary
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
