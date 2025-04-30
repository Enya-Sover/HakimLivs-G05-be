import express from 'express'
import { getRevenuePerMonth, topCostumers } from '../controllers/analyticsController.js'
import {auth, adminAuth} from '../middleware/auth.js';
const analyticsRoutes = express.Router();

analyticsRoutes.get("/revenue-per-month", getRevenuePerMonth)
analyticsRoutes.get("/top-costumers", topCostumers)


export default analyticsRoutes