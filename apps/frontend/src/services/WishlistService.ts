import type { WishlistItem } from "../types/WishlistItem";
import { WishlistRepository } from "../repositories/WishlistRepository";

export class WishlistService {
  private repo: WishlistRepository;

  constructor(repo: WishlistRepository) {
    this.repo = repo;
  }

  list(token?: string) {
    return this.repo.list(token);
  }

  toggle(item: WishlistItem, token?: string) {
    return this.repo.toggle(item, token);
  }

  remove(id: string, token?: string) {
    return this.repo.remove(id, token);
  }
}