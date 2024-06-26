import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req, res) => {
    try {
        const {fullname,username,password,confirmPassword,gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({"error":"Password don't match."})
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({"error":"username already exists."});
        }

        // HASH password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newuser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
        });

        if(newuser){


        generateTokenAndSetCookie(newuser._id, res);
        await newuser.save();

            res.status(201).json({
                _id: newuser._id,
                fullname: newuser.fullname,
                username: newuser.username,
                gender: newuser.gender,
                profilePic: newuser.profilePic
            });
        }else{
            res.status(400).json({error: "Invalid user data"})
        }

    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({error:"internal server error"});
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
console.log(username)
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
           return res.status(400).json({error: "Invalid Username or Password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("error in login controller");
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message:"Logout successfull."})
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}