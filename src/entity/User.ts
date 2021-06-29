import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {
        type: String
    }
}, { timestamps: true })
export const User = mongoose.model("users", userSchema)