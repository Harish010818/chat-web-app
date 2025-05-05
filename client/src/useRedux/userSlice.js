import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
   name : "user",

   initialState : {
      authUser : null,
      otherUser : null,
      selectedUser : null
   },
    
    reducers : {
        setAuthUser : (state, action) => {
          state.authUser = action.payload;
       },
       
        setOtherUser : (state, action) => {
          state.otherUser = action.payload
       },
       
        setSelectedUser : (state, action) => {
          state. selectedUser = action.payload; 
       }
    }
})

export const {setAuthUser, setOtherUser, setSelectedUser} = userSlice.actions;
export default userSlice;