export class WishlistRepository {
  baseUrl = "http://localhost:3000/api/wishlist";

  async list(token: string) {
    const res = await fetch(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  }

  async add(productId: string, token: string) {
    const res = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    return res.json();
  }

  async remove(id: string, token: string) {
    await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}