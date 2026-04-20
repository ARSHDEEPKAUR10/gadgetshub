import type { WishlistItem } from "../types/WishlistItem";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type ToggleWishlistResponse = {
  message: string;
  inWishlist: boolean;
};

export class WishlistRepository {
  async list(token?: string): Promise<WishlistItem[]> {
    const res = await fetch(`${BASE_URL}/wishlist`, {
      method: "GET",
      headers: this.buildHeaders(token),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch wishlist: ${res.status} ${text}`);
    }

    return res.json();
  }

  async toggle(
    item: WishlistItem,
    token?: string
  ): Promise<ToggleWishlistResponse> {
    const res = await fetch(`${BASE_URL}/wishlist/${item.id}`, {
      method: "POST",
      headers: this.buildHeaders(token),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update wishlist: ${res.status} ${text}`);
    }

    return res.json();
  }

  async remove(id: string, token?: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/wishlist/${id}`, {
      method: "DELETE",
      headers: this.buildHeaders(token),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to remove wishlist item: ${res.status} ${text}`);
    }
  }

  private buildHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }
}