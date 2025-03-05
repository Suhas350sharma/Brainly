import {Router} from "express";
import {requiredBody} from "../zodSchema";
import {UserModel} from "../db";
import bcrypt from "bcryptjs"
import {z} from "zod";
import jwt from "jsonwebtoken";
import {JWT_SECRETE} from "../config"
import { auth } from "../middleware/auth";



export const userRouter= Router();

//@ts-ignore
userRouter.post("/signup",async (req,res)=>{
    try {
        console.log("Request Body:", req.body);

        const requiredBody = z.object({
            username: z.string().min(3, { message: "Name is too short" }).max(100, { message: "Name is too long" }),
            email: z.string().min(3).max(100).email().refine((val) => val.endsWith(".com"), {
                message: "Email must end with .com",
            }),
            password: z.string().min(6, { message: "Password is too short" }).max(16),
        });

        const parsedata = requiredBody.safeParse(req.body);

        if (!parsedata.success) {
            console.log("Validation Errors:", parsedata.error.errors);
            return res.status(400).json({ error: parsedata.error.errors });
        }

        const { username, email, password } = parsedata.data; // Use parsed data
        const hashedpassword = await bcrypt.hash(password, 10);

        const userexist = await UserModel.findOne({ email: email });
        if (userexist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        await UserModel.create({ username, email, password: hashedpassword });

        return res.status(200).json({ message: "User signed up successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})
//@ts-ignore
userRouter.post("/signin",async (req,res)=>{
    try {
        const {email,password}=req.body;
        const finduser= await UserModel.findOne({email});
        if(!finduser){
            return res.status(400).json({
                message:"you are not signed up"
            })
        }
        //@ts-ignore
        const passwordMatch=await bcrypt.compare(password,finduser.password);
        if(!passwordMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
        console.log(JWT_SECRETE);
        //@ts-ignore
        const token=jwt.sign({id:finduser._id.toString()},JWT_SECRETE);
        console.log(token);
         
        res.status(200).json({
            token:token,
            message:"You logged in"
        })
    } catch (error) {
            return res.status(500).json({error:error})
    }

});
//@ts-ignore
userRouter.get('/me',auth,(req,res)=>{
    res.json({
        messaeg:"hello"
    })
})

