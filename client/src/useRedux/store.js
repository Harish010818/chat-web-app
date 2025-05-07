import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import messageSlice from "./messageSlice.js";
import socketSlice from "./socketSlice.js";

const store = configureStore({
    reducer : {
       user : userSlice.reducer,
       message : messageSlice.reducer,
       socket : socketSlice.reducer 
    }
})

export default store;


