import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/category.js'
import orderRoutes from "./routes/order.js"
import userRoutes from './routes/users.js'
import { auth, adminAuth } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors('*'));
app.use(express.json());

//Migration

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

import dataMigrationRouterCommon from "./migration/data.migration.route_module.js";

//Migration för Products

import Product from "./models/Product.js";
const dataPath = join(_dirname, "data", "products.json");
console.log("Datapath", dataPath)
app.use(
  "/api/data-migration/products",
  dataMigrationRouterCommon(Product, dataPath)
);

//Migration för Category

import Category from './models/Category.js';
const categoryDataPath  = join(_dirname, "data", "categories.json");
app.use(
  "/api/data-migration/categories",
  dataMigrationRouterCommon(Category, categoryDataPath)
);


// API Documentation route
app.get('/api', (req, res) => {
  res.json({
    name: "Hakim Livs API",
    version: "1.0.0",
    endpoints: {
      auth: {
        "POST /api/auth/register": "Register a new user",
        "POST /api/auth/login": "Login with username and password"
      },
      products: {
        "GET /api/products": "Get all products",
        "GET /api/products/:id": "Get a single product by ID",
        "POST /api/products": "Create a new product (Admin only)",
        "PUT /api/products/:id": "Update a product (Admin only)",
        "DELETE /api/products/:id": "Delete a product (Admin only)"
      }
    },
    authentication: "Use Bearer token in Authorization header for protected routes"
  });
});

// Routes
app.use('/api/category', auth, adminAuth, categoryRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/products', auth, adminAuth, productRoutes);
app.use("/api/order", auth, orderRoutes)
app.use("/api/user", auth, adminAuth, userRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hakim-livs')
  .then(() => console.log('Connected to MongoDB', process.env.MONGODB_URI))
  .catch( err => {console.error('MongoDB connection error:', err)
    process.exit(1)});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});