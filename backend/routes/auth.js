import { Router } from "express";
import Joi from "joi";
import { User, validate } from "../model/user.js";
import bcrypt from 'bcrypt'

const router = Router()



router.post('/',async(req,res)=>{
 
    try{
        // const{error} = validate(req.body);
        // if(error) return res.status(400).send({message:error.details[0].message});

        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(401).send({message:"Invalid username or Password"})

        const validPassword = await bcrypt.compare(req.body.password,user.password)
        if(!validPassword) return res.status(401).send({message:"Invalid username or Password"})
        
        if(validPassword){

            const token = user.generateAuthToken();
            return res.status(200).send({data:token,message:"Logged in successfully"})
        }
    }catch(error){
        console.log(error)
        res.status(500).send({message:"Internal server error"})
    }
})

export default router