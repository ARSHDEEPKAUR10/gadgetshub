"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("@clerk/express");
const productRoutes_1 = __importDefault(require("./api/v1/routes/productRoutes"));
const wishlistRoutes_1 = __importDefault(require("./api/v1/routes/wishlistRoutes"));
const app = (0, express_1.default)();
app.use((0, express_1.default)());
app.use((0, express_2.clerkMiddleware)());
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://gadgetshub-nu.vercel.app",
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
// Routes
app.use("/api/v1/products", productRoutes_1.default);
app.use("/api/v1/wishlist", wishlistRoutes_1.default);
// Test route
app.get("/", (_req, res) => {
    res.send("Backend is running");
});
exports.default = app;
