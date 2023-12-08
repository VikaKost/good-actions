import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFriends } from "@/app/api/axios/api";

type Friend = {
  id: string;
  username: string;
};

type InitialState = Friend[];

const initialState: InitialState = [];

const fetchFriends = createAsyncThunk(
  "friends/fetchFriends",
  async (userId: string) => {
    const response = await getFriends(userId);
    console.log(response);
    return response;
  }
);

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export { fetchFriends };

export default friendsSlice.reducer;
