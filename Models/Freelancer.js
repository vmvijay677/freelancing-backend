import mongoose from "mongoose";

const freelancerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const freelancerModel = mongoose.model("Freelancer", freelancerSchema);

export default freelancerModel;