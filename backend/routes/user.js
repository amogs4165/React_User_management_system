import exp from "express";
import { User, validate } from "../model/user.js";
import bcrypt from "bcrypt"
const router=exp.Router()

router.post('/',async(req,res)=>{
    try {
        const{error} = validate(req.body)
        if(error) return res.status(400).send({message:error.details[0].message});

        const user = await User.findOne({email:req.body.email})
        if(user) return res.status(409).send({message:"User with given email already existed"});

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        await new User({...req.body,password:hashPassword}).save();
        res.status(201).send({message:'User created succesfully'})
        
    } catch (error) {
        res.status(500).send({message:"Internal server error"})
    }
})

export default router