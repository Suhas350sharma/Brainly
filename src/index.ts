require('dotenv').config();

import express from "express";
import jwt from "jsonwebtoken";
import Router from "express";
import {userRouter} from "./routes/users"

const app=express();
app.use(express.json());
console.log("hello")

app.use("/api/v1/users",userRouter);
// app.use("api/v1/contens",contentRouter);
app.listen(3000,()=>{
    console.log("Server activated");
})

