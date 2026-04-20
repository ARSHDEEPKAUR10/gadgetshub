import express from "express";
import { requireAuth } from "@clerk/express";
import prisma from "../../../lib/prisma";

const router = express.Router();

router.get("/", requireAuth(), async (req, res) => {
  try {
    const userId = (req as any).auth.userId;

    const items = await prisma.wishlist.findMany({
      where: { userId },
    });

    res.json(items);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", requireAuth(), async (req, res) => {
  try {
    const userId = (req as any).auth.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const item = await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });

    res.json(item);
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", requireAuth(), async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.wishlist.delete({
      where: { id },
    });

    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;