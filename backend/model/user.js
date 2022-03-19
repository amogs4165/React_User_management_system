"use strict"

import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";


const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

})

userSchema.method.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" })
    return token
}

export const User = mongoose.model("user", userSchema);

export const validate = (data) => {
    const schema = Joi.object({
        userName: Joi.string().label("FirstName"),
        email: Joi.string().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
}




