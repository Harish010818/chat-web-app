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
    removeMessage: (state, action) => {
      if (state) {
        return state.filter(msg => msg._id !== action.payload)
      }

    }
  }
});

export const { setMessages, removeMessage } = messageSlice.actions;
export default messageSlice;
