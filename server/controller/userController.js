import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please Provide All Details...❌");
    }

    let user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      throw new Error("User not found with this email...❌");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Incorrect email or password...❌");
    }

    const tokenData = {
      userId: user._id,
    };

    //Generate Token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        error: false,
        message: `Welcome back ${user.username}...✅`,
        data: user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password || !phone) {
      throw new Error("Provide all details...❌");
    }

    // Check if the user already exists
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error("User already exists with this email...❌");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      phone: phone, // Use the correct variable
    });


    // Respond with success message
    res.status(201).json({
      success: true,
      error: false,
      message: "User registered successfully...✅",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      error: false,
      message: "User logged out successfully...✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const fetchUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      throw new Error("Please login first...❌");
    }

    let user = await User.findOne({ _id: userId });

    if (!user) {
      throw new Error("User not found with this email...❌");
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log(req.body)
    const { username, phone } = req.body; 
    const userId = req.userId;

    console.log(username, phone, userId);

    // Find the user by ID
    let user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found...❌");
    }

    // Update data
    if (username) user.username = username;
    if (phone) user.phone = phone;

    await user.save();

    const updatedUser = {
      _id: user._id,
      username: user.username,
      email:user.email,
      phone: user.phone,
    };

    return res.status(200).json({
      success: true,
      error: false,
      message: "Profile Updated Successfully...✅",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
