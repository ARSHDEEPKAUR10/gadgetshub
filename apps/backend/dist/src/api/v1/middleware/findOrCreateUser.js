"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreateUser = findOrCreateUser;
const express_1 = require("@clerk/express");
const prisma_1 = __importDefault(require("../../../lib/prisma"));
async function findOrCreateUser(req, res, next) {
    try {
        const auth = (0, express_1.getAuth)(req);
        const clerkUserId = auth.userId;
        if (!clerkUserId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const user = await prisma_1.default.user.upsert({
            where: { clerkUserId },
            update: {},
            create: { clerkUserId },
        });
        res.locals.user = {
            id: user.id,
            clerkUserId: user.clerkUserId,
        };
        next();
    }
    catch (error) {
        next(error);
    }
}
