import mongoose from "mongoose";
const Schema = mongoose.Schema
import { User } from "./User";

const purchaseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    amount: {
        type: Number
    }
}, { timestamps: true })
export const Purchase = mongoose.model("purchases", purchaseSchema)