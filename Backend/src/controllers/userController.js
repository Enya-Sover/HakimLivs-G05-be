import mongoose from "mongoose";
import User from "../models/User.js";


// Hämta alla användare
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};


