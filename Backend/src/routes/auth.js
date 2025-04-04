import express from 'express';
import {getAdminUser, register, login} from '../controllers/authController.js'

const authRouter = express.Router();


//Get adminUser

authRouter.get("/", getAdminUser)

// Register
authRouter.post('/register', register);

//TODO Login
authRouter.post('/login', login)

export default authRouter;