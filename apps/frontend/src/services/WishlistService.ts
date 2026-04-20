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
    await this.repo.add(Number(item.id), token);

    return {
      message: "Added to wishlist",
      inWishlist: true,
    };
  }

  remove(id: string, token: string) {
    return this.repo.remove(id, token);
  }
}