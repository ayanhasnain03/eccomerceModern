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



const logoutCurrentUser = asyncHandler(async(req,res,next)=>{
  res.cookie("jwt","",{
    httpOnly:true,
    expires:new Date(0),
  })
  res.status(200).json({message:"logout successfully"})
})

export { createUser,loginUser,logoutCurrentUser };
