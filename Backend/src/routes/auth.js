import express from 'express';
import { register, login, logout } from '../controllers/authController.js'

const authRouter = express.Router();

// Register
authRouter.post('/register', register); // alla kan registrera sig

//TODO Login
authRouter.post('/login', login) // alla kan logga in

//Logga ut användare
authRouter.post("/logout", logout)

export default authRouter;