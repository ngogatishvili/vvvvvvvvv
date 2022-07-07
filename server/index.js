import express from "express";
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();


const app=express()

import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"



app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use("/posts",postRoutes);
app.use("/user",userRoutes);



const PORT=process.env.PORT||9090;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>console.log(`server is listening to the port ${PORT}`))
})
.catch((err)=>{
    console.log(err.message);
})


