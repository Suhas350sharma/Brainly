"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const auth_1 = require("../middleware/auth");
exports.userRouter = (0, express_1.Router)();
//@ts-ignore
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request Body:", req.body);
        const requiredBody = zod_1.z.object({
            username: zod_1.z.string().min(3, { message: "Name is too short" }).max(100, { message: "Name is too long" }),
            email: zod_1.z.string().min(3).max(100).email().refine((val) => val.endsWith(".com"), {
                message: "Email must end with .com",
            }),
            password: zod_1.z.string().min(6, { message: "Password is too short" }).max(16),
        });
        const parsedata = requiredBody.safeParse(req.body);
        if (!parsedata.success) {
            console.log("Validation Errors:", parsedata.error.errors);
            return res.status(400).json({ error: parsedata.error.errors });
        }
        const { username, email, password } = parsedata.data; // Use parsed data
        const hashedpassword = yield bcryptjs_1.default.hash(password, 10);
        const userexist = yield db_1.UserModel.findOne({ email: email });
        if (userexist) {
            return res.status(400).json({ message: "Email already exists" });
        }
        yield db_1.UserModel.create({ username, email, password: hashedpassword });
        return res.status(200).json({ message: "User signed up successfully" });
    }
    catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}));
//@ts-ignore
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const finduser = yield db_1.UserModel.findOne({ email });
        if (!finduser) {
            return res.status(400).json({
                message: "you are not signed up"
            });
        }
        //@ts-ignore
        const passwordMatch = yield bcryptjs_1.default.compare(password, finduser.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        console.log(config_1.JWT_SECRETE);
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ id: finduser._id.toString() }, config_1.JWT_SECRETE);
        console.log(token);
        res.status(200).json({
            token: token,
            message: "You logged in"
        });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
}));
//@ts-ignore
exports.userRouter.get('/me', auth_1.auth, (req, res) => {
    res.json({
        messaeg: "hello"
    });
});
