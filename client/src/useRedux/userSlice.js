import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
   name: "user",

   initialState: {
      authUser: null,
      otherUser: [],
      selectedUser: null,
      onlineUsers: null,
      loader: true
   },

   reducers: {
      setAuthUser: (state, action) => {
         state.authUser = action.payload;
      },

      setOtherUser: (state, action) => {
         state.otherUser = action.payload
      },

      setSelectedUser: (state, action) => {
         state.selectedUser = action.payload;
      },

      setOnlineUsers: (state, action) => {
         state.onlineUsers = action.payload;
      },

      setLoader: (state, action) => {
         state.loader = action.payload;
      }
   }
})

export const { setAuthUser, setOtherUser, setSelectedUser, setOnlineUsers, setLoader } = userSlice.actions;
export default userSlice;