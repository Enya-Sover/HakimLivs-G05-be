import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authRouter = express.Router();

// Register
authRouter.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    );
    
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//TODO Login
authRouter.post('/login', async (req,res)=>{

  try {
    const {username, password} = req.body
    const user = await User.findOne({username})
    if(!user){
      return res.status(401).json({error: 'Fel användarnamn eller lösenord'})
    }

    const isMatch = await user.comparePassword(password)
    if(!isMatch){
      return res.status(401).json({error: 'Fel användarnamn eller lösenord'})
    }
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    const refreshToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    res.json({message: 'Inloggningen lyckades', accessToken, refreshToken})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

export default authRouter;