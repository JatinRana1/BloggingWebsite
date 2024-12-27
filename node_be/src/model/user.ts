import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        required: false,
    },
    role: {
        type: Number,
        enum: [1, 2, 3, 4], // 1 = admin, 2 = editor, 3 = author, 4 = subscriber
        required: true,
    },
    refreshToken: {
        type: String,
        required: false,
    },
    status: {
        type: Number,
        enum: [1, 2, 3], // 1 = active, 2 = suspended, 3 = inactive
        required: true,
        default: 1,
    },
    theme_preference: {
        type: Number,
        enum: [1, 2], // 1 = dark, 2 = light
        required: true,
        default: 1,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});

userSchema.pre('save', function (next) {
    this.updated_at = new Date(Date.now());
    next();
});

export const User = mongoose.model('User', userSchema);
