import mongoose from "mongoose";
import User from "../models/User";


// Hämta alla användare
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};

// Hämta alla användare med adminrättigheter
export const getAdminUser = async (req, res) => {
    try {
        const adminUser = await User.find({isAdmin: true})
        
        if(!adminUser) {
            return res.status(404).json({error: "No admin user found"})
        }
        res.status(200).json(adminUser)
    } catch(error) {
        res.status(500).json({error: "Server error", details:error.message})
    }

}


export const getUserInfo = async (req, res) => {
    try {
      const user = await User.findById(req.user._id); 
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  };