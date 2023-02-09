import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    number: { type: Number, required: true, unique:true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true })

mongoose.models = {}

export default mongoose.model('ContactRequests', ContactSchema)