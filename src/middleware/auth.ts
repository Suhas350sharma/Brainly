import { NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import { JWT_SECRETE } from "../config";

export function auth(req:Request,res:Response,next:NextFunction){
    try{
    //  @ts-ignore
    const header=req.headers['authorization'];
    //@ts-ignore
    const decode=jwt.verify(header as string,JWT_SECRETE);

    if(decode){
        //@ts-ignore
        req.userId=decode.id;
        next();
    }else{
        //@ts-ignore
        res.status(401).json({message:"unauthorized token"})
    }


    }catch(error){
        //@ts-ignore
        return res.status(400).json({
            message:"Your cannot access this page..."
        })
    }
}