import jwt from 'jsonwebtoken'
import { User } from '../model/user.js';
import pkg from 'mongoose'
const { ObjectId } = pkg
export const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    } else
        res.status(401).json({ message: "Invalied credential" })

    if (!token)
        res.status(401).json({ message: "Invalied credential" })

    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    } catch (error) {
        res.status(401).json({ message: 'Token failed' })
    }

    // verify the user from the database
    if (payload) {
        req.user = payload
        let user = await User.findById(payload._id)
        if (user) next()
        else res.status(404).json({ message: 'User not found' })
    }



}