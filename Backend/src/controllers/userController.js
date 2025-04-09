import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


// Hämta alla användare
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (req, res) => {
  const {id} = req.params
  try {
    const user = await User.findById(id);
    if (user === null) {
      return res.status(404).json({error: error.message })
    } else {
    res.status(200).json(user); 
  }   
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updatePassword = async(req, res) => {
  const {id} = req.params
  const {oldPassword, newPassword} = req.body

  try {
      const user = await User.findById(id)
      if (!user) return res.status(400).json({message: "User not found"})

      const isMatch = await bcrypt.compare(oldPassword, user.password)
      if (!isMatch) return res.status(400).json({message: "Wrong password"})
      
        user.password = newPassword

      await user.save()

      res.status(200).json({message: "Uppdated to new passswod"})
  } catch (err) {
    console.log(err)
    res.status(500).json({message: "Something went wrong!"})
  }
  
}