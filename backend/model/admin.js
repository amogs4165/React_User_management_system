import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";


const adminSchema = new mongoose.Schema({
    adminName: { type: String, required: true },
    password: { type: String, required: true },

})

adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "7d" })
    return token
}

export const Admin = mongoose.model("admin", adminSchema);