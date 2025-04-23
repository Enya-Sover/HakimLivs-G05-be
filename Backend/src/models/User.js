import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: { type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: Number,
    required: true,
    trim: true
  },
  adress: [ 
    {
      street: {type: String, required: true},
      zipcode: {type: Number, required: true},
      city: {type: String, required: true},
      country: {type: String, required: true}
    }
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  isAdmin: {
    type: Boolean,
    default: false
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  lojaltyBonus: {
    type: Boolean,
    default: false
  },
  refreshToken: {
    type: String,
    default: null
  }
 
}, 
{
  timestamps: true
});


// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      isAdmin: this.isAdmin
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      isAdmin: this.isAdmin
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// Trogenkundlogik
userSchema.pre('save', function(next) {
  if (this.totalAmount >= 10000) {
    this.lojaltyBonus = true;
  } else {
    this.lojaltyBonus = false;
  }
  next();
});

export default mongoose.model('User', userSchema);