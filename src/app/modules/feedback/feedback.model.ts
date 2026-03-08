import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },
    category: String,
    priority: String,

    sentiment: String,
    team: String,
    createdAt:
    {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model("Feedback", feedbackSchema);