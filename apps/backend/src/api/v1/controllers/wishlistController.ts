import { Request, Response } from "express";
import prisma from "../../../lib/prisma";

type FrontendWishlistItem = {
  id: string;
  title: string;
  category: "smartphones" | "laptops" | "headphones" | "accessories";
  priceCAD: number;
  rating: number;
};

function mapCategory(
  category: string
): FrontendWishlistItem["category"] {
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

export async function getWishlist(
  _req: Request,
  res: Response
): Promise<void> {
  const user = res.locals.user;

  const items = await prisma.wishlist.findMany({
    where: { userId: user.id },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  const response: FrontendWishlistItem[] = items.map((item: any) => ({
    id: String(item.product.id),
    title: item.product.name,
    category: mapCategory(item.product.category),
    priceCAD: item.product.price,
    rating: 4.5,
  }));

  res.json(response);
}

export async function toggleWishlist(
  req: Request,
  res: Response
): Promise<void> {
  const user = res.locals.user;
  const productId = Number(req.params.productId);

  if (Number.isNaN(productId)) {
    res.status(400).json({ message: "Invalid product id" });
    return;
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  const existing = await prisma.wishlist.findFirst({
    where: {
      userId: user.id,
      productId,
    },
  });

  if (existing) {
    await prisma.wishlist.delete({
      where: { id: existing.id },
    });

    res.json({
      message: "Removed from wishlist",
      inWishlist: false,
    });
    return;
  }

  await prisma.wishlist.create({
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

export async function removeWishlistItem(
  req: Request,
  res: Response
): Promise<void> {
  const user = res.locals.user;
  const productId = Number(req.params.productId);

  if (Number.isNaN(productId)) {
    res.status(400).json({ message: "Invalid product id" });
    return;
  }

  await prisma.wishlist.deleteMany({
    where: {
      userId: user.id,
      productId,
    },
  });

  res.status(204).send();
}