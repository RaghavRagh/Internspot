import User from "../models/user.js";
import fs from "fs";
import path from "path";
import cloudinary from "cloudinary";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update use profile
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, language } = req.body;
    let avatarUrl;

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "avatars",
      });

      fs.unlinkSync(req.file.path);
      avatarUrl = result.secure_url;

      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.language = language || user.language;
      if (avatarUrl) {
        user.avatar = avatarUrl;
      }

      await user.save();
      res.json({ message: 'Profile updated successfully', user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
