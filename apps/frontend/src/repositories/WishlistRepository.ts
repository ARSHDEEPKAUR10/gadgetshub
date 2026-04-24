import type { WishlistItem } from "../types/WishlistItem";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

  async add(productId: string, token: string) {
    const res = await fetch(`${BASE_URL}/wishlist`, {
      method: "POST",
      headers: {
        ...this.buildHeaders(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
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