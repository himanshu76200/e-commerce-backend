import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token && req.headers.authorization.startsWith('Bearer ')) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password');
            next()
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('not authorized token failed');
        }
    }
    if (!token) {
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

export { protect }