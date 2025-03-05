"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const users_1 = require("./routes/users");
const app = (0, express_1.default)();
app.use(express_1.default.json());
console.log("hello");
app.use("/api/v1/users", users_1.userRouter);
// app.use("api/v1/contens",contentRouter);
app.listen(3000, () => {
    console.log("Server activated");
});
