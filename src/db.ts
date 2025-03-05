import mongoose from 'mongoose';
import { Schema,model } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;


mongoose.connect("mongodb+srv://suhas:Fordmustang1969@suhas.cbbha.mongodb.net/Brainly");


const UserSchema=new Schema({
    username:String,
    email:{type:String,unique:true},
    password:String
})

export const UserModel=model("User",UserSchema);

const ContentSchema=new Schema({
    title:String,
    link:String,
    tags:[{type:ObjectId,ref:"tag"}],
    userId:[{
        type:ObjectId,
        ref:"User",
        required:true
    }]
})

export const ContentModel=model("Content",ContentSchema);