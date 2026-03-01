import type { WishlistItem } from "../types/WishlistItem";
import { WishlistRepository } from "../repositories/WishlistRepository";

export class WishlistService {
  private repo: WishlistRepository;

  constructor(repo: WishlistRepository) {
    this.repo = repo;
  }

  async list(): Promise<WishlistItem[]> {
    return this.repo.getAll();
  }

  async toggle(item: WishlistItem): Promise<{ inWishlist: boolean; message: string }> {
    if (!item.title.trim()) return { inWishlist: false, message: "Title is required." };
    if (item.priceCAD < 0) return { inWishlist: false, message: "Price must be >= 0." };
    if (item.rating < 0 || item.rating > 5)
      return { inWishlist: false, message: "Rating must be 0-5." };

    const existing = await this.repo.getById(item.id);
    if (existing) {
      await this.repo.remove(item.id);
      return { inWishlist: false, message: "Removed from wishlist " };
    }

    await this.repo.add(item);
    return { inWishlist: true, message: "Added to wishlist" };
  }

  async remove(id: string): Promise<void> {
    await this.repo.remove(id);
  }
}