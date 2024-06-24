import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { username, email, password, photo } = req.body;
  console.log("Request received:", req.body); // Log the received request body

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log("User already exists:", email); // Log existing user check
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword, photo });
    await user.save();
    console.log("New user created:", user); // Log new user creation

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    });

    res.status(201).json({ token, message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err); // Log the error
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", req.body); // Log received request

  try {
    const user = await User.findOne({ email });
    console.log("User in auth:", user);
    if (!user) {
      console.log("User not found:", email); // Log user not found
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email); // Log password mismatch
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Only destructure after confirming the user exists and password matches
    const { password: userPassword, ...rest } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    });

    res
      .status(200)
      .json({ token, user: { ...rest }, message: "Login successful" });
  } catch (err) {
    console.error("Error during login:", err); // Log the error
    res.status(500).json({ message: "Server Error" });
  }
};
