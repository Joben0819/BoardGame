import { configureStore, combineReducers } from "@reduxjs/toolkit";
import baccaratSlice from "../reducers/baccarat";
import userSlice from "../reducers/userInfo";
import gameSettingSlice from "../reducers/gameSettings";
import gameDataSlice from "../reducers/gameData";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  baccarat: baccaratSlice,
  userInfo: userSlice,
  gameSettings: gameSettingSlice,
  gameData: gameDataSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // other options e.g middleware, go here
});

export const persistor = persistStore(store);
