import express from "express";
import cors from 'cors'
import morgan from 'morgan'
const app=express()
app.use(express.json())
app.use(morgan('dev'))
// app.use(cors())
app.get('/post',(req,res)=>{
    console.log("top");
    res.json({data:'api runnung'})
    console.log('requset')
})

app.listen(3000,console.log("server connected in 5000"))