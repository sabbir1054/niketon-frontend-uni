import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { reducer } from "./rootReducer";
import { baseApi } from "./api/baseApi";

export const makeStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Required for redux-persist
      }).concat(baseApi.middleware),
  });

  const persistor = persistStore(store); // Create persistor instance

  return { store, persistor };
};

// Infer the types of store and dispatch
export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
