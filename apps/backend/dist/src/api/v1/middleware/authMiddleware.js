"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthMiddleware = void 0;
const express_1 = require("@clerk/express");
const requireAuthMiddleware = (req, res, next) => {
    const auth = (0, express_1.getAuth)(req);
    const userId = auth.sessionClaims?.subject;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    res.locals.userId = userId;
    next();
};
exports.requireAuthMiddleware = requireAuthMiddleware;
