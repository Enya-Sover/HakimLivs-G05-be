import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema ({
    category: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    }
})

export default mongoose.model('Category', categorySchema);