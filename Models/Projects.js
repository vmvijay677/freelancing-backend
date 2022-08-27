import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    client: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    applications: []
}, {
    timestamps: true,
});

const projectModel = mongoose.model("Projects", projectSchema);

export default projectModel;