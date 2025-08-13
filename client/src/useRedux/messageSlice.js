import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",

  initialState: {
    messages: null,
    messageDelete : false
  },

  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },

    setMessageDelete : (state, action) => {
       state.messageDelete = action.payload;
    }
  }
});

export const { setMessages, removeMessage, setMessageDelete } = messageSlice.actions;
export default messageSlice;
