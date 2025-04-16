import express from 'express';
<<<<<<< HEAD
import { register, login, registerAdmin} from '../controllers/authController.js'
import {auth, adminAuth} from '../middleware/auth.js';
=======
import { register, login, logout } from '../controllers/authController.js'
>>>>>>> bf3662b8c6f23d51e042cd554bfb95b83fd0ac14

const authRouter = express.Router();

// Register
authRouter.post('/register', register); // alla kan registrera sig
authRouter.post('/registerAdmin', auth, adminAuth, registerAdmin); // endast admin kan registrera admin

//TODO Login
authRouter.post('/login', login) // alla kan logga in

//Logga ut användare
authRouter.post("/logout", logout)

export default authRouter;