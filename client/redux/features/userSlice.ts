import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: UserState;
};

type UserState = {
  username: string;
  id: string;
  email: string;
};

const initialState = {
  value: {
    username: "",
    id: "",
    email: "",
  } as UserState,
} as InitialState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<UserState>) => {
      return {
        value: {
          username: action.payload.username,
          id: action.payload.id,
          email: action.payload.email,
        },
      };
    },
  },
});

export const { logIn, logOut } = user.actions;
export default user.reducer;
