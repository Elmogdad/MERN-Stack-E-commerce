import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs"
import createToken from "../utils/createToken.js";


///Create New User
const createUser = asyncHandler (async (req, res) => {
    const {username , email, password} = req.body;

   if (!username || !email || !password) {
    throw new Error('Please fill all the inputs.')
   }

   const userExists = await User.findOne({email})
   if (userExists) res.status(400).send('User already exists');

   const salt = await bcrypt.genSalt(10);
   const handlePassword = await bcrypt.hash(password, salt)

   const newUser = new User({username , email , password : handlePassword})

try {

await newUser.save();
createToken(res, newUser._id)

res.status(201).json({
    _id: newUser._id, 
    username : newUser.username ,
    email: newUser.email,
    isAdmin: newUser.isAdmin
});
}
catch {
    res.status(400)
    throw new Error('Invalid user data')
}
});

/// Post Login
const loginUser = asyncHandler(async (req, res) => {
    const {email , password} = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser) {
        const isPasswordVaild = await bcrypt.compare(password, existingUser.password);
        if(isPasswordVaild){
            createToken(res, existingUser._id)
            res.status(201).json({
                _id: existingUser._id, 
                username : existingUser.username ,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            });
          return; 
        }
    }
})
export {createUser, loginUser}