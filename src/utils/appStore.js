import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import grainReducer from "./grainSlice";
import cartReducer from "./cartSlice";
import storage from "redux-persist/lib/storage";
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

/*
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    grain: grainReducer,
    cart: cartReducer,
  },
});
*/

//Combine all your reducers
const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  grain: grainReducer,
  cart: cartReducer,
});

//Wrap the rootReducer with persistReducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "grain", "feed"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
  reducer: persistedReducer,
  devTools: {
    serialize: true, //helps DevTools show nested data correctly
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(appStore);
export default appStore;
