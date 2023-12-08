import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  status: boolean;
};

const initialState = {
  status: false,
} as ModalState;

export const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    show: () => {
      return { status: true };
    },
    hide: () => {
      return { status: false };
    },
  },
});

export const { show, hide } = modal.actions;
export default modal.reducer;
