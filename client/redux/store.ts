import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import friendReducer from "./features/friendsSlice";
import modalReducer from "./features/modalSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
export const store = configureStore({
  reducer: { userReducer, friendReducer, modalReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
