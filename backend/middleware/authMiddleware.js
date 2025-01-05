import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

const authenticate = asyncHandler(async (req, resizeBy, next) => {
    let token;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
        try {
         
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch {
            resizeBy.status(401)
            throw new Error('Not authorized, tokrn failed.')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token.')
    }

});

/// Authorize Admin

const authorizeAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send('Not authorized as an admin.')
    }
}




export {authenticate , authorizeAdmin }