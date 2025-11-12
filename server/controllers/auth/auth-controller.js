import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists with this email. Please use a different one.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error("Registration Error:", error);
    // Handle duplicate key error just in case
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Please use a different email.",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Some error occurred",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    // Send only ONE response
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Logged In Successfully",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "logged out successfully",
  });
};

//auth middleware

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token; // ✅ safe access
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user - No token found",
    });
  }

  try {
    const decodedToken = jwt.verify(token, "CLIENT_SECRET_KEY"); // ✅ same key
    req.user = decodedToken; // ✅ lowercase
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user - Invalid token",
    });
  }
};
