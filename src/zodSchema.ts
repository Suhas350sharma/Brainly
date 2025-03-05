import { z } from "zod";

export function requiredBody(){
    const schema=z.object({
        username:z.string().min(3,{message:"Name is Too short"}).max(100,{message:"Name is too long"}),
        email:z.string().min(3).max(100).email().endsWith(".com"),
        password:z.string().min(6,{message:"password is too small"}).max(16)
    })
    return schema;
}