import {Router } from "express";
import { auth } from "../middleware/auth";
import { ContentModel } from "../db";

const contentRouter=Router();  
//@ts-ignore 
contentRouter.get("/contents",auth,async(req,res)=>{
    try{
        //@ts-ignore
        const userId=req.userId;
        const contents=await ContentModel.find({userId:userId});
        res.json(contents);
    }catch(error){
        //@ts-ignore
        res.status(400).json({message:"Error in fetching contents",error:error.message
        })
    }
});


contentRouter.post("/addcontents",auth,async(req,res)=>{
    try{
        //@ts-ignore
        const userId=req.userId;
        const {title,link,tags}=req.body;
        const content=new ContentModel({
            title,
            link,
            tags,
            userId
        });
        await content.save();
        res.json(content);
    }catch(error){
        //@ts-ignore
        res.status(400).json({message:"Error in adding contents",error:error.message
        })
    }
}