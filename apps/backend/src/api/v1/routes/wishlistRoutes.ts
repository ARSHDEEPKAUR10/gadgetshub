import prisma from "../../../lib/prisma"; 
import { Router, Request, Response } from "express";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/", requireAuth(), async (req: Request, res: Response) => {
  try {
    const userId = (req as any).auth.userId;

    const items = await prisma.wishlist.findMany({
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
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", requireAuth(), async (req: Request, res: Response) => {
  try {
    const userId = (req as any).auth.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const existing = await prisma.wishlist.findFirst({
      where: { userId, productId },
    });

    if (existing) {
      await prisma.wishlist.delete({
        where: { id: existing.id },
      });

      return res.json({
        message: "Removed from wishlist",
        inWishlist: false,
      });
    }

    await prisma.wishlist.create({
      data: { userId, productId },
    });

    res.json({
      message: "Added to wishlist",
      inWishlist: true,
    });
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", requireAuth(), async (req: Request, res: Response) => {
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