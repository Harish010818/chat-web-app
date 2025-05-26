import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
      fullName : {
         type : String,
         required : true 
      },
      
      username : {
        type : String,
        unique : true,
        required : true  
      },

      password : {
        type : String,
        required : true
      },

      profilePhoto : {
        type : String,
        default : "" 
      },

      gender : {
        type : String,
        enum : ["male", "female"],
        required : true 
    }
},{timestamps: true})

export const User = mongoose.model('User', UserModel);

