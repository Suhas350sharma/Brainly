"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredBody = requiredBody;
const zod_1 = require("zod");
function requiredBody() {
    const schema = zod_1.z.object({
        username: zod_1.z.string().min(3, { message: "Name is Too short" }).max(100, { message: "Name is too long" }),
        email: zod_1.z.string().min(3).max(100).email().endsWith(".com"),
        password: zod_1.z.string().min(6, { message: "password is too small" }).max(16)
    });
    return schema;
}
