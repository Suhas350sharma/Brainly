"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function auth(req, res, next) {
    try {
        //@ts-ignore
        const header = req.headers['authorization'];
        //@ts-ignore
        const decode = jsonwebtoken_1.default.verify(header, config_1.JWT_SECRETE);
        if (decode) {
            //@ts-ignore
            req.userId = decode.id;
            next();
        }
        else {
            //@ts-ignore
            res.status(401).json({ message: "unauthorized token" });
        }
    }
    catch (error) {
        //@ts-ignore
        return res.status(400).json({
            message: "Your cannot access this page..."
        });
    }
}
