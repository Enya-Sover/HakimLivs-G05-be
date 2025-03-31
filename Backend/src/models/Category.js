import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema ({
    category: String

})

export default mongoose.model('Category', categorySchema);