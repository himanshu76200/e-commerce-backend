import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import generateToken from "../util/generateToken.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public 
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401) // unauthorized request
        throw new Error('Invalid email or password')
    }
})

// @desc Register a new user
// @route POST /api/users
// @access Public 
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    const userExits = await User.findOne({ email: email });

    if (userExits) {
        res.status(400) // bad request
        throw new Error('User already exists')
    }

    const user = await User.create({
        email: email,
        password: password,
        name: name
    })

    if (user) {
        // something was created 201
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Get User & get user profile
// @route GET /api/users/profile
// @access Private 
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})

// @desc Update User & user profile
// @route PUT /api/users/profile
// @access Private 
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { name, email, password } = req.body;
    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        if (password) {
            user.password = password
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})

export { authUser, getUserProfile, registerUser, updateUserProfile }