import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender} = req.body;
        if ( !fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({
                message: "All field are required"
            })
        }
        
        if(password !== confirmPassword){
            return res.status(400).json({
               message: "Password are not matched"
               
           })
       }


       const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                message: " The user is already exist with this username"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleAvatar =  `https://avatar.iran.liara.run/public/girl username=${username}`;

        const userData = await User.create(
            {
                fullName, 
                username, 
                password : hashedPassword, 
                profilePhoto : gender == male ?  maleAvatar : femaleAvatar, 
                gender
            }
        )
    

        return res.status(200).json({
            success : true,
            message : "Account created successfully",
            userData
        }) 

    } catch(err) {
        console.error(err);
    }
}


// login handler

export const login = async(req, res) => {
    try {
       const {username, password} = req.body;

       if( !username || !password ){
            return res.status(400).json({
                message: "All field are required"
            })
       }

       const user = await User.findOne({ username });
        
       const isPswdMatch = 0;

       if(user) isPswdMatch = await bcrypt.compare(password, user.password);   

       if(!isPswdMatch || !user){
            return res.status(400).json({
                message: "Incorrect Password or username"
            })
       }

        
      const token = jwt.sign({ userId : user._id}, process.env.SECRET_KEY, { expiresIn: '1d' });
      
      return res.status(200)
            .cookie("token", token, {
                httpOnly : true,
                secure : true,
                sameSite : "none",
                maxAge : 24 * 60 * 60 * 1000   
            }) 
            .json({message: "Login successfully",  user})
     
    }  catch(err){
        console.error(err); 
    } 
} 
