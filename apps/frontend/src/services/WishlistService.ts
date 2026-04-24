import type { WishlistItem } from "../types/WishlistItem";
import { WishlistRepository } from "../repositories/WishlistRepository";

export class WishlistService {
  private repo: WishlistRepository;

  constructor(repo: WishlistRepository) {
    this.repo = repo;
  }

  list(token: string) {
    return this.repo.list(token);
  }

  async toggle(item: WishlistItem, token: string) {
    const list = await this.repo.list(token);

    const exists = list.some(
      (x: WishlistItem) => x.id === item.id
    );

    if (exists) {
      await this.repo.remove(item.id, token);

      return {
        message: "Removed from wishlist",
        inWishlist: false,
      };
    }

    await this.repo.add(item.id, token);

    return {
      message: "Added to wishlist",
      inWishlist: true,
    };
  }

  remove(id: string, token: string) {
    return this.repo.remove(id, token);
  }
}