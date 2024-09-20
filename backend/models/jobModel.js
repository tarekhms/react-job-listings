import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    company: {
        name: String,
        description: String,
        contactEmail: String,
        contactPhone: String
    },
}, {
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

export default Job;