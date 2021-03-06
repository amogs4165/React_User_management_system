import { Router } from "express";
import Joi from "joi";
import { User, validate } from "../model/user.js";
import bcrypt from 'bcrypt'
import { Admin } from "../model/admin.js";

const router = Router()



router.post('/',async(req,res)=>{
 
    try{
        // const{error} = validate(req.body);
        // if(error) return res.status(400).send({message:error.details[0].message});
        console.log(req.query);
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

router.post('/admin',async(req,res)=>{
 
    try{
        // if(req.body.email !== 'admin@gmail.com')
        // return res.status(401).send({message:"Invalid Email or Password"})

        // if(req.body.password !== '123456')
        // return res.status(401).send({message:"Invalid Email or Password"})

        // return res.status(200).send({})
        // const{error} = validate(req.body);
        // if(error) return res.status(400).send({message:error.details[0].message});

        const admin = await Admin.findOne({adminName:req.body.adminName});
        if(!admin) return res.status(401).send({message:"Invalid Adminname or Password"})

        const validPassword = await bcrypt.compare(req.body.password,admin.password)
        if(!validPassword) return res.status(401).send({message:"Invalid Adminname or Password"})
        
        if(validPassword){

            const token = admin.generateAuthToken();
            return res.status(200).send({data:token,message:"Logged in successfully"})
        }
    }catch(error){
        console.log(error)
        res.status(500).send({message:"Internal server error"})
    }
})

export default router