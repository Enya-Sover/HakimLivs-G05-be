import express from 'express'
import { adminAuth, auth } from '../middleware/auth'
import { createNewDiscount } from '../controllers/discountController'

const discountRoutes = express.router()

discountRoutes.post('/', auth, adminAuth, createNewDiscount )

export default discountRoutes