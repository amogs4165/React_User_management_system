import { Router } from "express";
import { User, validate } from "../model/user.js";

import bcrypt from "bcrypt"
import { Admin } from "../model/admin.js";
const router = Router()


router.post('/', async (req, res) => {
    try {

        const { error } = validate(req.body)
        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email })
        if (user) return res.status(409).json({ message: "User with given email already existed" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).json({ message: 'User created succesfully' })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post('/:userID', async (req, res) => {
    try {
        console.log(req.body,"heu");
        const userID = req.params.userID;

        const { error } = validate(req.body)
        if (error) return res.status(400).json({ message: error.details[0].message });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await User.updateOne({_id:userID},{ ...req.body, password: hashPassword });
        res.status(201).json({ message: 'User created succesfully' })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.status(201).json({ userDetails: user })
        console.log(user)
    } catch (error) {
        console.log(error);
    }
})

router.get('/:userID', async (req, res) => {
    try {
        const userID = req.params.userID
        const user = await User.findById(userID);
        res.status(201).json({ userDetails: user })
        console.log(user)
    } catch (error) {
        console.log(error);
    }
})

router.delete('/', async (req, res) => {
    try {
        const userID = req.query.userID
        console.log(userID)

        const user = await User.findById(userID);
        if (!user) return res.status(404).json({ message: "user not exist" })

        await User.findByIdAndDelete(userID)
        res.status(204).json({status:"true"})
      
    } catch (error) {
        console.log(error);
    }
})

router.post('/admin', async (req, res) => {
    try {
        console.log("hellooo");
        console.log(req.body);
        // const{error} = validate(req.body)
        // if(error) return res.status(400).send({message:error.details[0].message});

        // const user = await User.findOne({email:req.body.email})
        // if(user) return res.status(409).send({message:"User with given email already existed"});

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new Admin({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: 'Admin created succesfully' })

    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})


export default router