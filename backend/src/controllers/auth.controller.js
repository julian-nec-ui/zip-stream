
import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import router from "../routes/auth.route.js";
import "dotenv/config";

const BASE_URL_AVATAR_PROFILE = process.env.BASE_URL_AVATAR_PROFILE;

function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const randomIndex = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  return BASE_URL_AVATAR_PROFILE + randomIndex;
}

export async function signup(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  try {

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const randomAvatar = generateRandomString(19);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      profilePic: randomAvatar,
    });

    console.log(`New user created: ${newUser._id}`);

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.firstName + " " + newUser.lastName,
        image: newUser.profilePic || ""
      });
      console.log(`Stream user created for ${newUser.firstName + " " + newUser.lastName} `);
    } catch (err) {
      console.error(`Error creating/updating Stream user: ${newUser.firstName + " " + newUser.lastName} >> `, err);
    }

    const jwtToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
      algorithm: "HS256"
    });

    res.cookie("jwt", jwtToken, {
      httpOnly: true, // prevent XSS attacks
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ success: true, message: "User created successfully.", user: newUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }

};

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordMatched = await user.matchPassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
      algorithm: "HS256"
    });

    res.cookie("jwt", jwtToken, {
      httpOnly: true, // prevent XSS attacks
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      user,
      "timestamp": new Date()
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export function logout(req, res) {

  res.clearCookie("jwt", {
    httpOnly: true, // prevent XSS attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevent CSRF attacks
  });

  res.status(200).json({ success: true, message: "User logged out successfully.", "timestamp": new Date() });
};

export async function onBoarding(req, res) {

  try {
    const userId = req.user._id;
    const { nativeLanguage, learningLanguage, bio, location, profilePic } = req.body;

    if (!nativeLanguage && !learningLanguage && !bio && !location && !profilePic) {
      return res.status(400).json({
        message: "At least one of the following fields is required.",
        missingFields: [
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !bio && "bio",
          !profilePic && "profilePic",
          !location && "location"
        ].filter(Boolean)
      });
    }

    const updatingFields = {};

    if (nativeLanguage) {
      updatingFields.nativeLanguage = nativeLanguage;
    }

    if (learningLanguage) {
      updatingFields.learningLanguage = learningLanguage;
    }

    if (bio) {
      updatingFields.bio = bio;
    }

    if (location) {
      updatingFields.location = location;
    }

    if (profilePic) {
      updatingFields.profilePic = profilePic;
    }

    updatingFields.isOnboarded = true;

    const updatedUser = await User.findByIdAndUpdate(userId,
      {
        $set: updatingFields
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        image: updatedUser.profilePic || ""
      });
    } catch (err) {
      console.error(`<< Error updating Stream user during onboarding : `, err , " >>");
    }

    res.status(200).json({
      success: true,
      message: "User onboarding completed successfully.",
      user: updatedUser,
      "timestamp": new Date()
    });

  } catch (error) {
    console.error("Onboarding error: ", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};
