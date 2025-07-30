import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Conversation } from "../models/conversationModel.js";

//register handler
export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({
                message: "All field are required"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password are not matched"

            })
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                message: "The user is already exist with this username"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const userData = await User.create(
            {
                fullName,
                username,
                password: hashedPassword,
                profilePhoto: gender == "male" ? maleAvatar : femaleAvatar,
                gender
            }
        )


        return res.status(200).json({
            success: true,
            message: "Account created successfully",
            userData
        })

    } catch (err) {
        console.error(err);
    }
}


// login handler
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "All field are required"
            })
        }

        const user = await User.findOne({ username });

        let isPswdMatch = 0;

        if (user) isPswdMatch = await bcrypt.compare(password, user.password);

        if (!isPswdMatch || !user) {
            return res.status(400).json({
                message: "Incorrect Password or username"
            })
        }


        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 24 * 60 * 60 * 1000
            })
            .json({
                message: "Login successfully",
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                profilePhoto: user.profilePhoto
            })

    } catch (err) {
        console.error(err);
    }
}


// user logout handler
export const logout = async (_, res) => {
    try {
        return res.status(200)
            .cookie("token", " ", { maxAge: 0 })
            .json({
                message: "logged out successfully"
            })
    }
    catch (err) {
        console.error(err);
    }
}

// my profile information
export const getMyProfile = async (req, res) => {
        try {
            const myId = req.id;
            const myProfile = await User.findById(myId);
             
            if (!myProfile) return res.status(200).json("User not found 404");

            return res.status(200).json({
                success : true,   
                myProfile
            })
        }
        catch(err) {
            console.log(err); 
   } 
}


// To fetch all users when somelogged in  
export const otherUsers = async (req, res) => {
    try {
        const senderId = req.id;
        const allUsers = await User.find({ _id: { $ne: senderId } });

        const users = await Promise.all(

            allUsers.map(async (user) => {

                const convo = await Conversation.find({
                    Participants: { $all: [senderId, user._id] }
                }).populate("lastMessage");

                return {
                    _id: user._id,
                    fullName: user.fullName,
                    profilePhoto: user.profilePhoto,
                    lastMessage: convo[0]?.lastMessage?.message || null,
                    createdAt: convo[0]?.lastMessage?.createdAt || null
                }
            })
        );

        users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 

        return res.status(200).json(users);
    }
    catch (err) {
        console.error(err);
    }
}


