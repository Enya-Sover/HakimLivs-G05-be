import express from 'express'
import { getAllUsers, getAdminUser, getUserInfo } from '../controllers/userController'
// import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.get("/", getAllUsers)
userRouter.get("/admin", getAdminUser)


export default userRouter

