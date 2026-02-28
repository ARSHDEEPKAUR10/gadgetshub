import type { WishlistItem } from "../types/WishlistItem";
import { wishlistTestData } from "../data/WishlistTestData";

export class WishlistRepository {
  private wishlist: WishlistItem[] = [];

  private testData: WishlistItem[] = wishlistTestData;

  async getAll(): Promise<WishlistItem[]> {
    return [...this.wishlist];
  }

  async getById(id: string): Promise<WishlistItem | undefined> {
    return this.wishlist.find((x) => x.id === id);
  }

  async add(item: WishlistItem): Promise<void> {
    this.wishlist = [...this.wishlist, item];
  }

  async remove(id: string): Promise<void> {
    this.wishlist = this.wishlist.filter((x) => x.id !== id);
  }

  async setAll(items: WishlistItem[]): Promise<void> {
    this.wishlist = [...items];
  }

  async existsInTestData(id: string): Promise<boolean> {
    return this.testData.some((x) => x.id === id);
  }
}