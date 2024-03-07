import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asynchandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

//create User
const createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("please fill all the inputs");
  }
  const userExist = await User.findOne({ email });
  if (userExist) res.status(400).send("User already exist");

  const salt = await bcrypt.genSalt(10); //hasghed pass genrate
  const hashedpassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedpassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invaild user data");
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
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

const logoutCurrentUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logout successfully" });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found ");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedpassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);  
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }
    await user.deleteOne({ _id: user._id });
    res.json({message:"user removed"})
  }else{
    res.status(400);
    throw new Error("Cannot delete admin user");
  }
});
export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
};
