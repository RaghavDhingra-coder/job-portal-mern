import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"

// this function is used to register or signup a new user
export const register = async (req, res) => {
    try {
        // we take these details from the user
        const { fullName, email, phoneNumber, password, role } = req.body

        // all these details were companlusry so if user do not provide any one we will give success:false
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        const file = req.file
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

        // we check if user already exists with this email
        const user = await User.findOne({ email })

        // if user already existes we return user already existes with this email
        if (user) {
            return res.status(400).json({
                message: "User already exists with the email",
                success: false
            })
        }
        // we hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // we create a row in our user table for this new user
        await User.create({

            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url
            }
        })

        // Account created successfully
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    }

    catch (err) {
        console.log(err)
    }

}

// this function is used to login a user
export const login = async (req, res) => {
    try {
        // i take email,password and role from the user
        const { email, password, role } = req.body;

        // if user do not provide any of the detail i say something is missing
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "something is missing",
                success: false,
            });
        }

        // we will find the user with this email in our table
        let user = await User.findOne({ email });

        // if user does not exists with the entered email we say incorrect email or password
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or pssword",
                success: false,
            });
        }

        // we will match password entered by the user and the password stored in the table associated with user
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "inccorect email or password",
                success: false,
            });
        }
        // we will match user entered role and role associated with the user in the table
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false,
            });
        }
        // we define token data
        const tokenData = {
            userId: user._id,
        };
        // we genetate a token
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };
        // we send token in the cookie and the user details
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpsOnly: true,
                sameSite: "strict",
            })
            .json({
                message: `Welcome back ${user.fullName}`,
                user,
                success: true,
            });

    }
    catch (err) {
        console.log(err)
    }
}

// this function will be used to logout
export const logout = async (req, res) => {
    try {
        // we expire the token
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}

// this function will be used to update the profile
export const updateProfile = async (req, res) => {
    try {
        // we take these details from the user
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        const file = req.file

        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

        // the skills entered by user are spreated by commas and given as string so i split it in array
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        // i take id of user
        const userId = req.id;
        // find the user with that id
        let user = await User.findById(userId);

        // if user do not exists
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false,
            });
        }
        // update the feilds given by the user
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        if(cloudResponse)
        {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname
        }

        // we save the user
        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };
        // we return the updated user
        return res.status(200).json({
            message: "profile updated successfully",
            user,
            success: true,
        });

    }
    catch (err) {
        console.log(err)
    }
}