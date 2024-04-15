import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "@/libs/userSlice";
import dateReducer from "@/libs/dateSlice";
import adminReducer from "@/libs/adminSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  user: userReducer,
  date: dateReducer,
  admin: adminReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
