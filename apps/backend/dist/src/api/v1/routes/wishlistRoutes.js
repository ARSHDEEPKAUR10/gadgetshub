"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const express_1 = require("express");
const express_2 = require("@clerk/express");
const router = (0, express_1.Router)();
router.get("/", (0, express_2.requireAuth)(), async (req, res) => {
    try {
        const userId = req.auth.userId;
        const items = await prisma_1.default.wishlist.findMany({
            where: { userId },
            include: { product: true },
        });
        const formatted = items.map((w) => ({
            id: String(w.product.id),
            title: w.product.name,
            category: w.product.category.toLowerCase(),
            priceCAD: w.product.price,
            rating: 4.5,
        }));
        res.json(formatted);
    }
    catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ message: "Server error" });
    }
});
router.post("/", (0, express_2.requireAuth)(), async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "productId is required" });
        }
        const existing = await prisma_1.default.wishlist.findFirst({
            where: { userId, productId },
        });
        if (existing) {
            await prisma_1.default.wishlist.delete({
                where: { id: existing.id },
            });
            return res.json({
                message: "Removed from wishlist",
                inWishlist: false,
            });
        }
        await prisma_1.default.wishlist.create({
            data: { userId, productId },
        });
        res.json({
            message: "Added to wishlist",
            inWishlist: true,
        });
    }
    catch (error) {
        console.error("Error toggling wishlist:", error);
        res.status(500).json({ message: "Server error" });
    }
});
router.delete("/:id", (0, express_2.requireAuth)(), async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma_1.default.wishlist.delete({
            where: { id },
        });
        res.json({ message: "Removed from wishlist" });
    }
    catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
