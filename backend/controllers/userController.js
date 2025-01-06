import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

///Create New User
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  const handlePassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: handlePassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/// Post Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordVaild = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordVaild) {
      createToken(res, existingUser._id);
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    }
  }
});

//// Logout
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Successfully" });
});

/// Get All Users

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

/// Get Profile

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/// Update Profile

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const handlePassword = await bcrypt.hash(req.body.password, salt);

      user.password = handlePassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      username: updatedUser.username,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/// Delete User By Id

const deleteUserById = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        if(user.isAdmin) {
            res.status(400)
            throw new Error('Cannot delete admin user');
        }

        await User.deleteOne({_id: user._id});
        res.json({message : "User removed"})

    }  else {
       res.status(404)
       throw new Error("User not found")

    }

});

/// Get User By Id

const getUserById = asyncHandler (async (req, res) => {
const user = await User.findById(req.params.id).select('-password');

if (user) {
    res.json(user)
}else {
    res.status(404);
    throw new Error("User not found")
}
})

/// Update User By Id

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.isAdmin = Boolean(req.body.isAdmin);

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin : updatedUser.isAdmin
      })
    } else {
        res.status(404);
        throw new Error("User not found.")
    }
})

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById
};
