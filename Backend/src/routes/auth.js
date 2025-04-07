import express from 'express';
import { register, login} from '../controllers/authController.js'

const authRouter = express.Router();

// Register
authRouter.post('/register', register);

//TODO Login
authRouter.post('/login', login)

export default authRouter;