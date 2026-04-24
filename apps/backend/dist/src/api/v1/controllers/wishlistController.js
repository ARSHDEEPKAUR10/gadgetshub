"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishlist = getWishlist;
exports.toggleWishlist = toggleWishlist;
exports.removeWishlistItem = removeWishlistItem;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function mapCategory(category) {
    switch (category) {
        case "Smartphone":
            return "smartphones";
        case "Laptop":
            return "laptops";
        case "Headphones":
            return "headphones";
        case "Accessories":
            return "accessories";
        default:
            return "accessories";
    }
}
async function getWishlist(_req, res) {
    const user = res.locals.user;
    const items = await prisma_1.default.wishlist.findMany({
        where: { userId: user.id },
        include: { product: true },
        orderBy: { createdAt: "desc" },
    });
    const response = items.map((item) => ({
        id: String(item.product.id),
        title: item.product.name,
        category: mapCategory(item.product.category),
        priceCAD: item.product.price,
        rating: 4.5,
    }));
    res.json(response);
}
async function toggleWishlist(req, res) {
    const user = res.locals.user;
    const productId = Number(req.params.productId);
    if (Number.isNaN(productId)) {
        res.status(400).json({ message: "Invalid product id" });
        return;
    }
    const product = await prisma_1.default.product.findUnique({
        where: { id: productId },
    });
    if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
    }
    const existing = await prisma_1.default.wishlist.findFirst({
        where: {
            userId: user.id,
            productId,
        },
    });
    if (existing) {
        await prisma_1.default.wishlist.delete({
            where: { id: existing.id },
        });
        res.json({
            message: "Removed from wishlist",
            inWishlist: false,
        });
        return;
    }
    await prisma_1.default.wishlist.create({
        data: {
            userId: user.id,
            productId,
        },
    });
    res.json({
        message: "Added to wishlist",
        inWishlist: true,
    });
}
async function removeWishlistItem(req, res) {
    const user = res.locals.user;
    const productId = Number(req.params.productId);
    if (Number.isNaN(productId)) {
        res.status(400).json({ message: "Invalid product id" });
        return;
    }
    await prisma_1.default.wishlist.deleteMany({
        where: {
            userId: user.id,
            productId,
        },
    });
    res.status(204).send();
}
