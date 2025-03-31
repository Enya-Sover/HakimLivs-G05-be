import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema ({
    category: {
        type: String,
        required: false
    }

})

export default mongoose.model('Category', categorySchema);