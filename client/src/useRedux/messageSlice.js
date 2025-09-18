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
    },

    editMessage: (state, action) => {
      const { id, newText } = action.payload;
      state.messages = state.messages.map((msg) =>
        msg._id === id ? { ...msg, message: newText} : msg
      );
    }
  }
});

export const { setMessages, editMessage, unsendMessage } = messageSlice.actions;
export default messageSlice;
