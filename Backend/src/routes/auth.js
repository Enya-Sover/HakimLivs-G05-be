import express from 'express';
import { register, login, registerAdmin, logout} from '../controllers/authController.js'
import {auth, adminAuth} from '../middleware/auth.js';

const authRouter = express.Router();

// Register
authRouter.post('/register', register); // alla kan registrera sig
authRouter.post('/registerAdmin', auth, adminAuth, registerAdmin); // endast admin kan registrera admin

//TODO Login
authRouter.post('/login', login) // alla kan logga in

//Logga ut användare
authRouter.post("/logout", logout)

export default authRouter;