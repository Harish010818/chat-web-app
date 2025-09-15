import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",

  initialState: {
    messages: null
  },

  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    unsendMessage: (state, action) => {
      state.messages = state.messages.filter(msg => msg._id !== action.payload);
    }
  }
});

export const { setMessages, unsendMessage } = messageSlice.actions;
export default messageSlice;
