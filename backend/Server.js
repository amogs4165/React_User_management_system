import express, { Router } from "express";
import cors from 'cors'
import morgan from 'morgan'
import db from "./Config/db.js";
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import home from './routes/homePage.js';
import dotenv from 'dotenv'

const app = express()
dotenv.config()

//data base
db()

//middlewares
app.use(express.json())
app.use(morgan('dev'))
// app.use(cors())

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/home", home);

app.listen(3000, console.log("server connected in 3000"))