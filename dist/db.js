"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const ObjectId = mongoose_2.Schema.Types.ObjectId;
mongoose_1.default.connect("mongodb+srv://suhas:Fordmustang1969@suhas.cbbha.mongodb.net/Brainly");
const UserSchema = new mongoose_2.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
});
exports.UserModel = (0, mongoose_2.model)("User", UserSchema);
const ContentSchema = new mongoose_2.Schema({
    title: String,
    link: String,
    tags: [{ type: ObjectId, ref: "tag" }],
    userId: [{
            type: ObjectId,
            ref: "User",
            required: true
        }]
});
