import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asynchandler.js";
import bcrypt from "bcryptjs";
const createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("please fill all the inputs");
  }
  const userExist = await User.findOne({ email });
  if (userExist) res.status(400).send("User already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password:hashedpassword });

  try {
    await newUser.save();
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

export { createUser };
