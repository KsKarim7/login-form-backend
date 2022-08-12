import { mongoose } from "mongoose";

const userValidation = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', userValidation)

export default User;