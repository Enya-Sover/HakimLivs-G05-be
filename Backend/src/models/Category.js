import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema ({
    category: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
        trim: true
    }
})

export default mongoose.model('Category', categorySchema);